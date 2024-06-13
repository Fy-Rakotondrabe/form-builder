export interface Element {
  type: string;
  elementType: string;
  label: string;
  id?: string;
}

export interface Control {
  id: string;
  type: string;
  label?: string;
  format?: 'short' | 'multi-line' | 'decimal' | 'integer' | 'single' | 'multiple';
  options?: string[];
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  required?: boolean;
  value?: any;
  formula?: string;
  subValue?: any;
  index?: number
}

export interface Page {
  id: string;
  title: string;
  controls: Control[];
  index: number;
}

export interface SelectedElement {
  id: string;
  type: string;
  parentId: string | null;
  parentType: string | null;
}

export interface StoreProps {
  pages: Page[];
  selectedElement: SelectedElement | null;
  setPage: (id: string) => void;
  removePage: (id: string) => void;
  updatePage: (page: Page) => void;
  setSelectedElement: (id: string, type: string, parentId: string | null, parentType: string | null) => void;
  setPageControls: (pageId: string, controls: Control[]) => void;
  updatePageControls: (pageId: string, control: Control) => void;
  removePageControl: (pageId: string, controlId: string) => void;
}

