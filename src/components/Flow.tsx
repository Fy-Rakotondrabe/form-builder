import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  addEdge,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from '../constants/constants';
import { useFormContext } from '../context/formContext';
import { Field, Form, Page } from '../model';
import { useStore } from '../store/store';
import EntityComponent from './EntityComponent';
import PageComponent from './Page';
import { Button } from '@mui/material';


const nodeTypes = {
  [ItemTypes.ENTITY]: EntityComponent,
  [ItemTypes.PAGE]: PageComponent,
};

interface FlowSectionProps {
  onSave: (data: Form[]) => void;
  onError: (error: string) => void;
}

const FlowSection: FC<FlowSectionProps> = ({ onSave, onError }) => {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    generateForm,
    onRemoveEntityNode,
    onRemovePage
  } = useFormContext();

  const { entities, pages, selectedElement, setSelectedElement, setPage, setEntityNode, resetSelected } = useStore();
  const [transform, setTransform] = useState({ x: 0, y: 0, zoom: 1 });

  const [dataToCopy, setDataToCopy] = useState<Page | null>(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl or Cmd is pressed along with C or V
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'c':
            if (selectedElement) {
              const page = pages.find((item) => item.id === selectedElement.id);
              setDataToCopy(page);
            }
            break;
          case 'v':
            if (dataToCopy) {
              const id = uuidv4();
              const name = dataToCopy.pageName + ' (copy)'
              setPage({
                ...dataToCopy,
                id,
                pageName: name,
                index: dataToCopy.index + 1
              })

              const pageNode = nodes.find((item) => item.id === dataToCopy.id);
              const node = {
                id,
                type: ItemTypes.PAGE,
                position: {
                  x: pageNode.position.x + 350,
                  y: pageNode.position.y
                },
                data: {
                  id,
                  ...pageNode.data,
                  label: name,
                },
              }
              setNodes(nodes => [...nodes, node]);
              setSelectedElement(id, ItemTypes.PAGE, null, null);
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dataToCopy, nodes, pages, selectedElement, setNodes, setPage, setSelectedElement]);
  
  const connectionRules = useCallback((params, nodes) => {
    const { source, target } = params;
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);

    if ((sourceNode.type === ItemTypes.ENTITY && targetNode.type === ItemTypes.PAGE) || (sourceNode.type === ItemTypes.PAGE && targetNode.type === ItemTypes.ENTITY)) {
      // Allow the connection
      return true
    } else {
      // Prevent the connection and alert the user
      onError(`${sourceNode.type} can only be connected to ${targetNode.type} and vice versa.`);
      return false;
    }
  }, [onError]);

  const onConnect = useCallback(
    (params) => {
      if (connectionRules(params, nodes)) {
        setEdges((eds) => addEdge(params, eds))
      }
    },
    [connectionRules, nodes, setEdges],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.PAGE, ItemTypes.ENTITY],
    drop: (item: Field, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const id = uuidv4();
      const node = {
        id,
        type: item.type,
        position: {
          x: ((monitor.getClientOffset().x - 300) - transform.x) / transform.zoom, // 300 is item width
          y: ((monitor.getClientOffset().y - 40) - transform.y) / transform.zoom, // 40 is item height
        },
        data: {
          id,
          ...item,
        },
      }
      setNodes(nodes => [...nodes, node]);
      const entity = entities[0];

      switch (item.type) {
        case ItemTypes.PAGE: {
          const page: Page = {
            id: id,
            pageName: 'New Page',
            controls: [],
            index: null,
          }
          setPage(page);
          break;
        }
        case ItemTypes.ENTITY:
          setEntityNode({...entity, nodeId: id});
          break;
      }
      setSelectedElement(id, item.type, null, null)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [entities]);

  const handleNodeDelete = useCallback((node: Node) => {
    switch (node.data.type) {
      case ItemTypes.PAGE:
        onRemovePage(node.id)
        break;
      case ItemTypes.ENTITY:
        onRemoveEntityNode(node.id)
        break;
    }
    resetSelected();
  }, [onRemoveEntityNode, onRemovePage, resetSelected])

  const onMoveEnd = useCallback((params) => {
    setTransform(params);
  }, []);

  const onSaveForm = useCallback(() => {
    try {
      const json = generateForm();
      onSave(json);
    } catch (e) {
      onError(e);
    }
  }, [generateForm, onError, onSave])  

  return (
    <div className='flowContainer'>
      <div ref={drop} className={classNames("flow", { "over": isOver })}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          attributionPosition="top-right"
          zoomOnScroll={false}
          disableKeyboardA11y
          onNodesDelete={(nodes) => handleNodeDelete(nodes[0])}
          onMoveEnd={onMoveEnd}
        >
          <MiniMap pannable zoomable draggable />
          <Controls />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
      <Button className='save-btn' variant="contained" onClick={onSaveForm} fullWidth>
        Save
      </Button>
    </div>
  )
}

export default FlowSection