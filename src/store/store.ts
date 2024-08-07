import { create } from 'zustand'
import { v4 as uuidv4 } from "uuid";
import { AccordionControl, Control, Field, Entity, Page, StoreProps } from '../model'
import { FieldTypes, ItemTypes } from '../constants/constants';

export const useStore = create<StoreProps>((set, get) => ({
  pages: [],
  selectedElement: null,
  entities: [],
  entityNodes: [],
  setPage: (value: Page | null) => {
    if (value) {
      const pages = get().pages;
      pages.sort((a, b) => -a.index + b.index)
      pages.push({
        ...value,
        index: value.index ?? get().pages.length + 1
      })
      set((state) => ({ ...state, pages: pages }))
    } else {
      set((state) => ({ ...state, pages: [] }))
    }
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
  setPageControls: (pageId: string, item: Field, index: number) => {
    const controls = get().pages.find((p) => p.id === pageId)?.controls ?? [];
    let newControl: Control | AccordionControl

    if (item.type === FieldTypes.ACCORDION) {
      const lastAccordionIndex = controls.filter((c: Control) => c.type === FieldTypes.ACCORDION).map((item: Control) => item.index).reduce((a, b) => Math.max(a, b), 0);
      newControl = {
        id: uuidv4(),
        type: item.type,
        label: item.label,
        index: lastAccordionIndex + 1,
        controls: [],
      }
    } else {
      newControl = {
        id: uuidv4(),
        type: item.type,
        label: item.label,
        value: '',
        placeholder: item.label,
        required: false,
        format: 'single',
        options: [],
        index: null,
      }
    }
    const pageControls = get().pages.find(page => page.id === pageId);
    pageControls.controls.splice(index, 0, newControl);
    set((state) => ({ ...state, pages: state.pages.map((p) => p.id === pageId ? pageControls : p) }))
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
  setEntityNode: (entity: Entity | null) => {
    if (entity) {
      set((state) => ({ ...state, entityNodes: [...state.entityNodes, entity] }))
    } else {
      set((state) => ({ ...state, entityNodes: [] }))
    }
  },
  updateEntityNode: (id: string, entityNode: Entity) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.map((e) => e.nodeId === id ? {...e, ...entityNode} : e) }))
  },
  removeEntityNode: (id: string) => {
    set((state) => ({ ...state, entityNodes: state.entityNodes.filter((e) => e.nodeId !== id) }))
  },
  resetSelected: () => {
    set((state) => ({ ...state, selectedElement: null }))
  },
  setSelectedAccordionControl: (pageId, accordionId, controlId) => {
    set((state) => ({ ...state, selectedElement: { id: controlId, type: ItemTypes.FIELD, parentId: pageId, parentType: ItemTypes.ACCORDION, accordionId } }))
  }
}))
