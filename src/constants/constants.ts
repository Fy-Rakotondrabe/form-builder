import { Element } from "../model"

export const ItemTypes = {
  FIELD: 'element',
  PAGE: 'page'
}

export const ElementTypes = {
  PAGE: 'page',
  TEXT: 'text',
  NUMBER: 'numeric',
  DATE: 'date-picker',
}

export const Elements: Element[] = [
  {
    type: ElementTypes.PAGE,
    label: 'Page',
    elementType: ItemTypes.PAGE,
  },
  {
    type: ElementTypes.TEXT,
    label: 'Text',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.NUMBER,
    label: 'Number',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.DATE,
    label: 'Date',
    elementType: ItemTypes.FIELD,
  }
]

