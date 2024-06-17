import classNames from 'classnames';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from '../constants/constants';
import EntityComponent from './EntityComponent';
import FormComponent from './FormComponent';
import PageComponent from './Page';
import { useStore } from '../store/store';
import { Element } from '../model';

const nodeTypes = {
  [ItemTypes.ENTITY]: EntityComponent,
  [ItemTypes.FORM]: FormComponent,
  [ItemTypes.PAGE]: PageComponent,
};

const FlowSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { entities, setPage, setForms, setEntityNode } = useStore();
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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
  )
}

export default FlowSection