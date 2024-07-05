export interface Field {
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

export interface AccordionControl {
  id: string;
  label: string;
  index: number;
  controls: Control[];
}

export interface Page {
  id: string;
  pageName: string;
  controls: (Control | AccordionControl)[];
  index: number;
  position?: XYPosition;
}

export interface SelectedElement {
  id: string;
  type: string;
  parentId: string | null;
  parentType: string | null;
  accordionId?: string;
}

export interface Form {
  id: string;
}

export interface StoreProps {
  pages: Page[];
  entities: Entity[];
  entityNodes: Entity[];
  selectedElement: SelectedElement | null;
  setPage: (value: Page | null) => void;
  removePage: (id: string) => void;
  updatePage: (page: Page) => void;
  setSelectedElement: (id: string, type: string, parentId: string | null, parentType: string | null) => void;
  setPageControls: (pageId: string, item: Field, index: number) => void;
  updatePageControls: (pageId: string, control: Control) => void;
  removePageControl: (pageId: string, controlId: string) => void;
  setEntities: (entities: Entity[]) => void;
  setEntityNode: (entity: Entity | null) => void;
  updateEntityNode: (id: string, entity: Entity) => void;
  removeEntityNode: (entityId: string) => void;
  resetSelected: () => void;
  setSelectedAccordionControl: (pageId: string, accordionId: string, controlId: string) => void;
}

export interface XYPosition {
  x: number;
  y: number;
}

export interface Entity {
  name: string;
  id: string;
  nodeId?: string;
  displayType?: string;
  position?: XYPosition
}

export interface Form {
  id: string;
  pages: Page[];
  entity: Entity;
}
