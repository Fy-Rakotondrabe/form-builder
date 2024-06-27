import { Field } from "../model"

export const ItemTypes = {
  FIELD: 'element',
  PAGE: 'page',
  ENTITY: 'entity',
  ACCORDION: 'accordion'
}

export const FieldTypes = {
  PAGE: 'page',
  ENTITY: 'entity',
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
  READING: 'reading',
  ACCORDION: 'accordion'
}

export const Nodes: Field[] = [
  {
    type: FieldTypes.ENTITY,
    label: 'Entity',
    elementType: ItemTypes.ENTITY,
  },
  {
    type: FieldTypes.PAGE,
    label: 'Page',
    elementType: ItemTypes.PAGE,
  }
]

export const Fields: Field[] = [
  {
    type: FieldTypes.TEXT,
    label: 'Text',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.NUMBER,
    label: 'Number',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.DATE,
    label: 'Date',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.TIME,
    label: 'Time',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.PHOTO,
    label: 'Photo',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.CALCULATED,
    label: 'Calculated',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.BARCODE_SCAN,
    label: 'Barcode Scan',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.CHOICE,
    label: 'Choice',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.GEOLOCATION,
    label: 'Geolocation',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.MARKDOWN,
    label: 'Markdown',
    elementType: ItemTypes.FIELD,
  },
  {
    type: FieldTypes.CHECKBOX,
    label: 'Checkbox',
    elementType: ItemTypes.FIELD,
  },
    {
    type: FieldTypes.ACCORDION,
    label: 'Accordion',
    elementType: ItemTypes.ACCORDION,
  },
  {
    type: FieldTypes.READING,
    label: 'Reading',
    elementType: ItemTypes.FIELD,
  }
]

