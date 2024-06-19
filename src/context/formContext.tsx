import { createContext, useContext, FC, ReactNode } from "react";
import { useEdgesState, useNodesState, Node, Edge } from "reactflow";
import { useStore } from "../store/store";
import { useCallback } from "react";
import { Form } from "../model";

interface FormContextType {
  nodes: Node[];
  setNodes: any;
  onNodesChange: any;
  edges: Edge[];
  setEdges: any;
  onEdgesChange: any;
  generateForm: () => Form[];
  onRemoveEntityNode: (id: string) => void;
  onRemoveForm: (id: string) => void;
  onRemovePage: (id: string) => void;
  onRemovePageControl: (parentId: string, id: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pages, entityNodes, forms, removeEntityNode, removeForm, removePage, removePageControl } = useStore();

  const removeNode = useCallback((nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
  }, [setNodes])

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((edges) => edges.filter((edge) => edge.source !== edgeId && edge.target !== edgeId));
  }, [setEdges])

  const onRemoveEntityNode = useCallback((id: string) => {
    removeNode(id);
    removeEdge(id);
    removeEntityNode(id);
  }, [removeEntityNode, removeNode, removeEdge]);

  const onRemoveForm = useCallback((id: string) => {
    removeNode(id);
    removeEdge(id);
    removeForm(id);
  }, [removeForm, removeNode, removeEdge]);

  const onRemovePage = useCallback((id: string) => {
    removeNode(id);
    removeEdge(id);
    removePage(id);
  }, [removePage, removeNode, removeEdge]);

  const onRemovePageControl = useCallback((parentId: string, id: string) => {
    removePageControl(parentId, id);
  }, [removePageControl]);

  const generateForm = useCallback(() => {
    const formsData: Form[] = []

    try {
      entityNodes.forEach((entity) => {
        const edge = edges.find((item) => item.source === entity.nodeId);
        const form = forms.find((item) => item.id === edge.target)
        
        const formEdges = edges.filter((item) => item.source === form.id);
        const formPages = pages.filter((item) => formEdges.some(edge => edge.target === item.id))
        formsData.push({
          pages: formPages,
          id: form.id,
          entity: entity.id,
        })
      })
      return formsData
    } catch (e) {
      throw('Close all nodes before saving (Entity -> Form -> Pages)');
    }
  }, [edges, entityNodes, forms, pages])

  const contextValue = {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    generateForm,
    onRemoveEntityNode,
    onRemoveForm,
    onRemovePage,
    onRemovePageControl
  };

  return (
    <FormContext.Provider value={contextValue as FormContextType}>
      {children}
    </FormContext.Provider>
  );
};

// Hook to use the form context
const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useFormContext };
