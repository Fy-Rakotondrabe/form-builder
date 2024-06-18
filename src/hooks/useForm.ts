import { useEdgesState, useNodesState } from "reactflow";
import { useStore } from "../store/store";
import { useEffect } from "react";

const useForm = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pages, entityNodes, forms } = useStore();

  useEffect(() => {
    console.log({
      nodes,
      edges,
      pages,
      entityNodes,
      forms
    })
  }, [nodes, edges, pages, entityNodes, forms])

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  }
}

export default useForm;