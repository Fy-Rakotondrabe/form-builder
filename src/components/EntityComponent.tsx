import { Handle, Position } from 'reactflow'
import { useStore } from '../store/store';
import { ItemTypes } from '../constants/constants';
import { Typography } from '@mui/material';

const EntityComponent = ({ data }) => {
  const { entityNodes, setSelectedElement } = useStore();
  const entityNode = entityNodes.find((e) => e.nodeId === data.id);
  console.log(entityNode)
  return (
    <div onClick={() => setSelectedElement(data.id, ItemTypes.ENTITY, null, null)} className='entity-node'>
      <Typography>{entityNode?.name}</Typography>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default EntityComponent