import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
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
import { Element, Form } from '../model';
import { useStore } from '../store/store';
import EntityComponent from './EntityComponent';
import FormComponent from './FormComponent';
import PageComponent from './Page';
import { Button } from '@mui/material';


const nodeTypes = {
  [ItemTypes.ENTITY]: EntityComponent,
  [ItemTypes.FORM]: FormComponent,
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
    onRemoveForm,
    onRemovePage
  } = useFormContext();

  const { entities, setPage, setForms, setEntityNode, resetSelected } = useStore();
  const [transform, setTransform] = useState({ x: 0, y: 0, zoom: 1 });
  
  const connectionRules = useCallback((params, nodes, edges) => {
    const { source, target } = params;
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);

    if (sourceNode.type === ItemTypes.ENTITY) {
      const existingConnections = edges.filter(e => e.source === source);
      if (existingConnections.length >= 1) {
        onError('This node can only connect to one node. (Select edge and press Del to remove it)');
        return false; // Prevent connection
      }
    }

    if ((sourceNode.type === ItemTypes.ENTITY && targetNode.type === ItemTypes.FORM) || (sourceNode.type === ItemTypes.FORM && targetNode.type === ItemTypes.ENTITY)) {
      // Allow the connection
      return true
    } else if ((sourceNode.type === ItemTypes.FORM && targetNode.type === ItemTypes.PAGE) || (sourceNode.type === ItemTypes.PAGE && targetNode.type === ItemTypes.FORM)) {
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
      if (connectionRules(params, nodes, edges)) {
        setEdges((eds) => addEdge(params, eds))
      }
    },
    [connectionRules, edges, nodes, setEdges],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.PAGE, ItemTypes.ENTITY, ItemTypes.FORM],
    drop: (item: Element, monitor) => {
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
          ...item
        },
      }
      setNodes(nodes => [...nodes, node]);
      const entity = entities[0];

      switch (item.type) {
        case ItemTypes.PAGE:
          setPage(id);
          break;
        case ItemTypes.ENTITY:
          setEntityNode({...entity, nodeId: id});
          break;
        case ItemTypes.FORM:
          setForms(id);
          break;
      }
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
      case ItemTypes.FORM:
        onRemoveForm(node.id)
        break;
    }
    resetSelected();
  }, [onRemoveEntityNode, onRemoveForm, onRemovePage, resetSelected])

  const onMoveEnd = useCallback((params) => {
    setTransform(params);
  }, []);

  const onSaveForm = useCallback(() => {
    const json = generateForm();
    onSave(json);
  }, [generateForm, onSave])  

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