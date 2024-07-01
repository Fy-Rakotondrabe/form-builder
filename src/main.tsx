import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'reactflow/dist/style.css';
import FormBuilder from '.';
import { Box } from '@mui/material';
import { Form } from './model';

const entities = [
  {name: "Entity-1", id: "1"},
  {name: "Entity-2", id: "2"}
]

const entityType = ['table', 'list']

const value: Form[] = [
    {
        "pages": [
            {
                "id": "72a7630b-0fd0-45e5-94ad-2141d88f5f51",
                "pageName": "New Page",
                "controls": [
                    {
                        "id": "fd64b855-f1fa-4483-ac68-7bf7da0344b3",
                        "type": "numeric",
                        "label": "Number",
                        "value": "",
                        "placeholder": "Number",
                        "required": false,
                        "format": "single",
                        "options": [
                            "A",
                            "B"
                        ],
                        "index": 1
                    },
                    {
                        "id": "3335c7b6-e822-477a-8b3e-dadb6aef2830",
                        "type": "date-picker",
                        "label": "Date",
                        "value": "",
                        "placeholder": "Date",
                        "required": false,
                        "format": "single",
                        "options": [
                            "A",
                            "B"
                        ],
                        "index": 1
                    }
                ],
                "index": 2,
                "position": {
                    "x": 281,
                    "y": 250
                }
            },
            {
                "id": "728de8dc-9851-474a-9b18-9d245fca2e0a",
                "pageName": "New Page",
                "controls": [
                    {
                        "id": "4b0e7da9-69b7-493d-aebb-90e0975de768",
                        "type": "text",
                        "label": "Text",
                        "value": "",
                        "placeholder": "Text",
                        "required": false,
                        "format": "single",
                        "options": [
                            "A",
                            "B"
                        ],
                        "index": 1
                    },
                    {
                        "id": "94519657-6d36-4e64-a91a-079b0ee0301b",
                        "type": "numeric",
                        "label": "Number",
                        "value": "",
                        "placeholder": "Number",
                        "required": false,
                        "format": "single",
                        "options": [
                            "A",
                            "B"
                        ],
                        "index": 1
                    }
                ],
                "index": 1,
                "position": {
                    "x": 283,
                    "y": 32
                }
            }
        ],
        "id": "f1943c04-6896-469a-ac22-3d4c6547639e",
        "entity": {
            "name": "Entity-1",
            "id": "1",
            "nodeId": "a95ab0fa-3d89-4df7-afcd-92337ac9a69c",
            "position": {
                "x": 79,
                "y": 77
            }
        }
    },
    {
        "pages": [
            {
                "id": "9b6b3436-58f3-4028-81db-3ba0defe8352",
                "pageName": "New Page",
                "controls": [
                    {
                        "id": "595b41a7-6b2d-486f-a68b-0c26087ab54a",
                        "type": "barcode-scan",
                        "label": "Barcode Scan",
                        "value": "",
                        "placeholder": "Barcode Scan",
                        "required": false,
                        "format": "single",
                        "options": [
                            "A",
                            "B"
                        ],
                        "index": 1
                    }
                ],
                "index": 3,
                "position": {
                    "x": 267.32714977026956,
                    "y": 558.4521273666184
                }
            }
        ],
        "id": "b779dcc6-6915-4586-bdc4-e3cbc5a1de72",
        "entity": {
            "name": "Entity-2",
            "id": "2",
            "nodeId": "1fb10778-b3a9-4ef1-a12c-cc2b8cad8280",
            "position": {
                "x": 92.58572196696605,
                "y": 572.2278439567082
            }
        }
    }
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <FormBuilder 
        value={value} 
        entities={entities} 
        entityType={entityType}
        onSave={(data) => console.log(data)} 
        onError={(error) => console.log(error)} 
      />
    </Box>
  </React.StrictMode>,
)