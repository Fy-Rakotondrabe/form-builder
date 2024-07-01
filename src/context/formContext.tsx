import { createContext, useContext, FC, ReactNode } from "react";
import { useEdgesState, useNodesState, Node, Edge } from "reactflow";
import { useStore } from "../store/store";
import { useCallback } from "react";
import { AccordionControl, Form, SelectedElement } from "../model";
import { v4 as uuidv4 } from 'uuid';
import { FieldTypes, ItemTypes } from "../constants/constants";

interface FormContextType {
  nodes: Node[];
  setNodes: any;
  onNodesChange: any;
  edges: Edge[];
  setEdges: any;
  onEdgesChange: any;
  init: (value: Form[]) => void;
  generateForm: () => Form[];
  onRemoveEntityNode: (id: string) => void;
  onRemoveForm: (id: string) => void;
  onRemovePage: (id: string) => void;
  onRemovePageControl: (parentId: string, id: string) => void;
  onRemoveAccordionControl: (selectedElement: SelectedElement) => void;
  updateAccordionControls: (selectedElement: SelectedElement, data: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pages, entityNodes, setPage, setEntityNode, removeEntityNode, removePage, removePageControl, updatePage } = useStore();

  const init = useCallback((value: Form[]) => {
    setEntityNode(null);
    setPage(null);

    let initialNodes = [];
    let initialEdges = [];

    value.forEach((form) => {
      const entityNode = {
        id: form.entity.nodeId,
        position: form.entity.position,
        type: FieldTypes.ENTITY,
        data: {
          id: form.entity.nodeId,
          type: FieldTypes.ENTITY,
          label: form.entity.name,
          elementType: ItemTypes.ENTITY,
        }
      }
      setEntityNode(form.entity)

      const pageNodes = form.pages.map((page) => {
        setPage(page);
        const pageNode = {
          id: page.id,
          position: page.position,
          type: FieldTypes.PAGE,
          data: {
            id: page.id,
            type: FieldTypes.PAGE,
            label: page.pageName,
            elementType: ItemTypes.PAGE,
          }
        }
        return pageNode;
      })

      const pageEdges = form.pages.map((page) => ({
        id: uuidv4(),
        source: form.entity.nodeId,
        target: page.id
      }))

      initialNodes = [...initialNodes, entityNode, ...pageNodes]
      initialEdges = [...initialEdges, ...pageEdges]
    });

    setNodes((prevNodes) => [...prevNodes, ...initialNodes]);
    setEdges((prevEdges) => [...prevEdges, ...initialEdges])
  }, [setNodes, setEdges, setEntityNode, setPage]);

  const removeNode = useCallback((nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
  }, [setNodes]);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((edges) => edges.filter((edge) => edge.source !== edgeId && edge.target !== edgeId));
  }, [setEdges]);

  const onRemoveEntityNode = useCallback((id: string) => {
    removeNode(id);
    removeEdge(id);
    removeEntityNode(id);
  }, [removeEntityNode, removeNode, removeEdge]);

  const onRemovePage = useCallback((id: string) => {
    removeNode(id);
    removeEdge(id);
    removePage(id);
  }, [removePage, removeNode, removeEdge]);

  const onRemovePageControl = useCallback((parentId: string, id: string) => {
    removePageControl(parentId, id);
  }, [removePageControl]);

  const onRemoveAccordionControl = useCallback((selectedElement: SelectedElement) => {
    const page = pages.find(p => p.id === selectedElement?.parentId);
    updatePage({
      ...page,
      controls: page?.controls
        .map((c) => c.id === selectedElement?.accordionId 
          ? ({ 
              ...c, 
              controls: (c as AccordionControl)?.controls
                .filter((ac) => ac.id !== selectedElement?.id) 
            }) 
          : c
        )
    })
  }, [pages, updatePage])

  const generateForm = useCallback(() => {
    const formsData: Form[] = [];
    try {
      entityNodes.forEach((entity) => {
        const entityNode = nodes.find(item => item.id === entity.nodeId);

        const pageEdges = edges.filter((item) => item.source === entity.nodeId);

        const formPages = pages
          .filter((item) => pageEdges.some(edge => edge.target === item.id))
          .map((page) => {
            const node = nodes.find((item) => item.id === page.id)
            return {
              ...page,
              position: node.position
            }
          })
        formsData.push({
          pages: formPages,
          id: uuidv4(),
          entity: {
            ...entity,
            position: entityNode.position
          },
        })
      })
      console.log(formsData)
      return formsData
    } catch (e) {
      throw('Close all nodes before saving (Entity -> Form -> Pages)');
    }
  }, [edges, entityNodes, nodes, pages])

  const updateAccordionControls = useCallback((selectedElement: SelectedElement, data: any) => {
    const page = pages.find(p => p.id === selectedElement?.parentId);
    updatePage({
      ...page,
      controls: page?.controls
        .map((c) => c.id === selectedElement?.accordionId 
          ? ({ 
              ...c, 
              controls: (c as AccordionControl)?.controls
                .map((ac) => ac.id === selectedElement?.id ? ({ ...ac, ...data }) : ac) 
            }) 
          : c
        )
    })
  }, [pages, updatePage])

  const contextValue = {
    nodes,
    edges,
    init,
    setNodes,
    onNodesChange,
    setEdges,
    onEdgesChange,
    generateForm,
    onRemoveEntityNode,
    onRemovePage,
    onRemovePageControl,
    onRemoveAccordionControl,
    updateAccordionControls
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
