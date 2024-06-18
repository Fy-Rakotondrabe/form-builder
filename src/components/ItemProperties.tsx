import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/store"
import { ItemTypes } from "../constants/constants";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { Control, Entity, Form, Page } from "../model";
import { renderSetting } from "./renderSetting";

const ItemProperties = () => {
  const { selectedElement, pages, entities, entityNodes, forms, updatePage, updatePageControls, updateEntityNode } = useStore();
  const [type, setType] = useState(ItemTypes.PAGE);
  const [item, setItem] = useState<Page | Control | Entity | Form | undefined>(undefined);

  useEffect(() => {
    setType(selectedElement?.type as any);

    switch (selectedElement?.type) {
      case ItemTypes.PAGE:
        setItem(pages.find((page) => page.id === selectedElement.id));
        break;
      case ItemTypes.ENTITY:
        setItem(entityNodes.find((entity) => entity.nodeId === selectedElement.id));
        break;
      case ItemTypes.FORM:
        setItem(forms.find((form) => form.id === selectedElement.id));
        break;
      default:
        if (selectedElement?.parentType === ItemTypes.PAGE) {
          const parent = pages.find((page) => page.id === selectedElement.parentId);
          setItem(parent?.controls.find(item => item.id === selectedElement.id));
        }
        break;
    }
  }, [entityNodes, forms, pages, selectedElement])

  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    const data: any = { ...item, [name]: value }
    setItem(data);
    switch (selectedElement?.type) {
      case ItemTypes.PAGE:
        updatePage(data);
        break;
      case ItemTypes.FIELD:
        updatePageControls(selectedElement?.parentId ?? '', data);
        break;
      case ItemTypes.ENTITY: {
        const entity = entities.find(item => item.id === value);
        updateEntityNode(selectedElement?.id, {...entity, nodeId: selectedElement?.id});
        break;
      }
      default:
        break;
    }
  }, [entities, item, selectedElement?.id, selectedElement?.parentId, selectedElement?.type, updateEntityNode, updatePage, updatePageControls])

  const renderSettingView = useCallback(() => {
    switch (type) {
      case ItemTypes.PAGE:
        return (
          <>
            <Typography>Page</Typography>
            <TextField 
              label="Name" 
              name="pageName"
              value={(item as Page)?.pageName} 
              sx={{ mt: 4 }}
              onChange={handleChange}
              fullWidth
            />
            <TextField 
              label="N° Page" 
              name="index"
              value={(item as Page)?.index} 
              sx={{ mt: 4 }}
              type="number"
              onChange={handleChange}
              fullWidth
            />
          </>
        );
      case ItemTypes.ENTITY:
        return (
          <>
            <Typography>Entity</Typography>
            <Select
              value={(item as Entity)?.id}
              onChange={handleChange}
              fullWidth
              name="id"
              sx={{ mt: 4 }}
            >
              {entities.map((entity) => (
                <MenuItem value={entity.id}>{entity.name}</MenuItem>
              ))}
            </Select>
          </>
        );
      case ItemTypes.FORM:
        return (
          <>
            <Typography>Form</Typography>
            <Typography variant="caption">Id: {(item as Form)?.id}</Typography>
          </>
        );
      case ItemTypes.FIELD:
        return renderSetting(item as Control, handleChange);
      default:
        return <></>;
    }
  }, [entities, handleChange, item, type])

  return (
    <div className="item-properties">
      {selectedElement && renderSettingView()}
    </div>
  )
}

export default ItemProperties