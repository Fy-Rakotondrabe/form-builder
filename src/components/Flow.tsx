import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from '../constants/constants';
import { useFormContext } from '../context/formContext';
import { Element } from '../model';
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

const FlowSection = () => {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onSaveForm
  } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const { entities, setPage, setForms, setEntityNode } = useStore();
  
  const connectionRules = useCallback((params, nodes, edges) => {
    const { source, target } = params;
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);

    if (sourceNode.type === ItemTypes.ENTITY) {
      const existingConnections = edges.filter(e => e.source === source);
      if (existingConnections.length >= 1) {
        enqueueSnackbar('This node can only connect to one node. (Select edge and press Del to remove it)', { variant: 'warning' });
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
      enqueueSnackbar(`${sourceNode.type} can only be connected to ${targetNode.type} and vice versa.`, { variant: 'warning' });
      return false;
    }
  }, [enqueueSnackbar]);

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
          x: monitor.getSourceClientOffset().x,
          y: monitor.getSourceClientOffset().y,
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

  return (
    <div className='flowContainer'>
      <div ref={drop} className={classNames("flow", { "over": isOver })}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          attributionPosition="top-right"
          zoomOnScroll={false}
        >
          <MiniMap pannable zoomable draggable/>
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