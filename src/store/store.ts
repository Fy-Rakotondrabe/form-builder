import { create } from 'zustand'
import { Control, Entity, Form, Page, StoreProps } from '../model'

export const useStore = create<StoreProps>((set, get) => ({
  pages: [],
  selectedElement: null,
  entities: [],
  entityNodes: [],
  forms: [],
  setPage: (id: string) => {
    const page: Page = {
      id,
      title: 'New Page',
      controls: [],
      index: get().pages.length + 1,
    }

    const pages = get().pages;
    pages.sort((a, b) => -a.index + b.index)
    pages.push(page)
    set((state) => ({ ...state, pages: pages }))
  },
  removePage: (id: string) => {
    set((state) => ({ ...state, pages: state.pages.filter((page) => page.id !== id) }))
  },
  updatePage: (page: Page) => {
    set((state) => ({ ...state, pages: state.pages.map((p) => p.id === page.id ? page : p) }))
  },
  setSelectedElement: (id: string, type: string, parentId: string | null, parentType: string | null) => {
    set((state) => ({ ...state, selectedElement: { id, type, parentId, parentType } }))
  },
  setPageControls: (pageId: string, controls: Control[]) => {
    set((state) => ({ ...state, pages: state.pages.map((p) => p.id === pageId ? ({ ...p, controls }) : p) }))
  },
  updatePageControls: (pageId: string, control: Control) => {
    set((state) => ({
      ...state,
      pages: state.pages.map((p) => {
        if (p.id === pageId) {
          return {
            ...p,
            controls: p.controls.map((c) => c.id === control.id ? { ...c, ...control } : c)
          };
        }
        return p;
      })
    }))
  },
  removePageControl: (pageId: string, controlId: string) => {
    set((state) => ({ ...state, pages: state.pages.map((p) => p.id === pageId ? ({ ...p, controls: p.controls.filter((c) => c.id !== controlId) }) : p) }))
  },
  setForms: (id: string) => {
    const form = {
      id,
      pages: [],
    }
    set((state) => ({ ...state, forms: [...state.forms, form] }))
  },
  updateForm: (form: Form) => {
    set((state) => ({ ...state, forms: state.forms.map((f) => f.id === form.id ? form : f) }))
  },
  deleteForm: (id: string) => {
    set((state) => ({ ...state, forms: state.forms.filter((f) => f.id !== id) }))
  },
  setEntities: (entities: Entity[]) => {
    set((state) => ({ ...state, entities }))
  },
  setEntityNode: (entity: Entity) => {
    set((state) => ({ ...state, entityNodes: [...state.entityNodes, entity] }))
  },
  updateEntityNode: (id: string, entityNode: Entity) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.map((e) => e.nodeId === id ? entityNode : e) }))
  },
  deleteEntityNode: (id: string) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.filter((e) => e.id !== id) }))
  },
}))
