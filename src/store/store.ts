import { create } from 'zustand'
import { v4 as uuidv4 } from "uuid";
import { Control, Element, Entity, Page, StoreProps } from '../model'

export const useStore = create<StoreProps>((set, get) => ({
  pages: [],
  selectedElement: null,
  entities: [],
  entityNodes: [],
  setPage: (value: Page) => {
    const pages = get().pages;
    pages.sort((a, b) => -a.index + b.index)
    pages.push({
      ...value,
      index: value.index ?? get().pages.length + 1
    })
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
  setPageControls: (pageId: string, item: Element) => {
    const controls = get().pages.find((p) => p.id === pageId)?.controls ?? [];
    const lastReadingIndex = controls.filter((c) => c.type === 'reading').map(item => item.index).reduce((a, b) => Math.max(a, b), 0);
    const newControl: Control = {
      id: uuidv4(),
      type: item.type,
      label: item.label,
      value: '',
      placeholder: item.label,
      required: false,
      format: 'single',
      options: ['A', 'B'],
      index: lastReadingIndex + 1
    }
    set((state) => ({ ...state, pages: state.pages.map((p) => p.id === pageId ? ({ ...p, controls: [...p.controls, newControl] }) : p) }))
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
  setEntities: (entities: Entity[]) => {
    set((state) => ({ ...state, entities }))
  },
  setEntityNode: (entity: Entity) => {
    set((state) => ({ ...state, entityNodes: [...state.entityNodes, entity] }))
  },
  updateEntityNode: (id: string, entityNode: Entity) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.map((e) => e.nodeId === id ? entityNode : e) }))
  },
  removeEntityNode: (id: string) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.filter((e) => e.id !== id) }))
  },
  resetSelected: () => {
    set((state) => ({ ...state, selectedElement: null }))
  }
}))
