import { useEdgesState, useNodesState } from "reactflow";
import { useStore } from "../store/store";
import { useCallback } from "react";

const useForm = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pages, entityNodes, forms } = useStore();

  const onSaveForm = useCallback(() => {
    console.log({
      nodes,
      edges,
      pages,
      entityNodes,
      forms
    })

    const json = {
      masterForm: {
        childForms: []
      }
    }

    entityNodes.forEach((entity) => {
      const edge = edges.find((item) => item.source === entity.nodeId);
      const form = forms.find((item) => item.id === edge.target)
      
      const formEdges = edges.filter((item) => item.source === form.id);
      const formPages = pages.filter((item) => formEdges.some(edge => edge.target === item.id))
      json.masterForm.childForms.push({
        pages: formPages,
        id: form.id,
        entity: entity.id,
      })
    }, [])

    console.log(json)
  }, [edges, entityNodes, forms, nodes, pages])

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onSaveForm,
  }
}

export default useForm;