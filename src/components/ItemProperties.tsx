import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/store"
import { ItemTypes } from "../constants/constants";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AccordionControl, Control, Entity, Form, Page } from "../model";
import { renderSetting } from "./renderSetting";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useFormContext } from "../context/formContext";

const ItemProperties = () => {
  const { 
    selectedElement, 
    pages, 
    entities, 
    entityNodes, 
    updatePage, 
    updatePageControls, 
    updateEntityNode,
    resetSelected,
  } = useStore();
  const {
    onRemoveEntityNode,
    onRemovePage,
    onRemovePageControl,
    onRemoveAccordionControl,
    updateAccordionControls,
  } = useFormContext();
  const [type, setType] = useState(ItemTypes.PAGE);
  const [item, setItem] = useState<Page | Control | Entity | Form | AccordionControl | undefined>(undefined);

  useEffect(() => {
    setType(selectedElement?.type as any);

    switch (selectedElement?.type) {
      case ItemTypes.PAGE:
        setItem(pages.find((page) => page.id === selectedElement.id));
        break;
      case ItemTypes.ENTITY:
        setItem(entityNodes.find((entity) => entity.nodeId === selectedElement.id));
        break;
      default:
        if (selectedElement?.parentType === ItemTypes.PAGE) {
          const parent = pages.find((page) => page.id === selectedElement.parentId);
          setItem(parent?.controls.find(item => item.id === selectedElement.id) as Control);
        } else if (selectedElement?.parentType === ItemTypes.ACCORDION) {
          const parent = pages.find((page) => page.id === selectedElement.parentId);
          const accordion: AccordionControl = parent?.controls.find((c) => c.id === selectedElement.accordionId) as AccordionControl;
          const accordionControl = accordion?.controls.find((c) => c.id === selectedElement.id);
          setItem(accordionControl);
        }
        break;
    }
  }, [entityNodes, pages, selectedElement])

  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    const data: any = { ...item, [name]: value }
    setItem(data);
    switch (selectedElement?.type) {
      case ItemTypes.PAGE:
        updatePage(data);
        break;
      case ItemTypes.ACCORDION:
        updatePageControls(selectedElement?.parentId ?? '', data);
        break;
      case ItemTypes.FIELD:
        if (selectedElement.accordionId) {
          updateAccordionControls(selectedElement, data);
        } else {
          updatePageControls(selectedElement?.parentId ?? '', data);
        }
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

  const handleRemove = useCallback(() => {
    switch (selectedElement?.type) {
      case ItemTypes.PAGE:
        onRemovePage(item.id)
        break;
      case ItemTypes.ENTITY:
        onRemoveEntityNode((item as Entity).nodeId)
        break;
      case ItemTypes.ACCORDION:
      case ItemTypes.FIELD:
        if (selectedElement?.accordionId) {
          onRemoveAccordionControl(selectedElement);
        } else {
          onRemovePageControl(selectedElement?.parentId ?? '', item.id)
        }
        break;
    }
    setItem(null);
    resetSelected();
  }, [selectedElement, resetSelected, onRemovePage, item, onRemoveEntityNode, onRemoveAccordionControl, onRemovePageControl])

  const renderSettingView = useCallback(() => {
    switch (type) {
      case ItemTypes.ACCORDION:
        return (
          <>
            <Typography>Accordion</Typography>
            <TextField 
              label="Label" 
              name="label"
              value={(item as AccordionControl).label} 
              sx={{ mt: 4 }}
              onChange={handleChange}
              fullWidth
            />
          </>
        );
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
      case ItemTypes.FIELD:
        return renderSetting(item as Control, handleChange);
      default:
        return <></>;
    }
  }, [entities, handleChange, item, type])

  return (
    <div className="item-properties-container">
      {item && selectedElement && (
        <>
          <div className="item-properties">
            {selectedElement && renderSettingView()}
          </div>
            <Button className="remove-btn" fullWidth onClick={handleRemove} variant="contained" color="error" startIcon={<DeleteOutline />}>
            Remove
          </Button>
        </>
      )}
    </div>
  )
}

export default ItemProperties