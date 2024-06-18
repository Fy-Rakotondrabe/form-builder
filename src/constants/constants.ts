import { Element } from "../model"

export const ItemTypes = {
  FIELD: 'element',
  PAGE: 'page',
  ENTITY: 'entity',
  FORM: 'form'
}

export const ElementTypes = {
  PAGE: 'page',
  ENTITY: 'entity',
  FORM: 'form',
  TEXT: 'text',
  NUMBER: 'numeric',
  DATE: 'date-picker',
  TIME: 'time-picker',
  MARKDOWN: 'markdown',
  CHECKBOX: 'checkbox',
  GEOLOCATION: 'geolocation',
  BARCODE_SCAN: 'barcode-scan',
  CHOICE: 'choice',
  PHOTO: 'photo',
  CALCULATED: 'calculated',
  READING: 'reading'
}

export const Elements: Element[] = [
  {
    type: ElementTypes.ENTITY,
    label: 'Entity',
    elementType: ItemTypes.ENTITY,
  },
  {
    type: ElementTypes.FORM,
    label: 'Form',
    elementType: ItemTypes.FORM,
  },
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
  },
  {
    type: ElementTypes.TIME,
    label: 'Time',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.PHOTO,
    label: 'Photo',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.CALCULATED,
    label: 'Calculated',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.BARCODE_SCAN,
    label: 'Barcode Scan',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.CHOICE,
    label: 'Choice',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.GEOLOCATION,
    label: 'Geolocation',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.MARKDOWN,
    label: 'Markdown',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.CHECKBOX,
    label: 'Checkbox',
    elementType: ItemTypes.FIELD,
  },
  {
    type: ElementTypes.READING,
    label: 'Reading',
    elementType: ItemTypes.FIELD,
  }
]

