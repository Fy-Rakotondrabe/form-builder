import { create } from 'zustand'
import { Control, Page, StoreProps } from '../model'

export const useStore = create<StoreProps>((set, get) => ({
  pages: [],
  selectedElement: null,
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
  }
}))
