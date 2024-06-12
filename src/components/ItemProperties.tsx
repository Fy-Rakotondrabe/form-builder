import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/store"
import { ItemTypes } from "../constants/constants";
import { TextField, Typography } from "@mui/material";
import { Control, Page } from "../model";

const ItemProperties = () => {
  const { selectedElement, pages, updatePage, updatePageControls } = useStore();
  const [type, setType] = useState(ItemTypes.PAGE);
  const [item, setItem] = useState<Page | Control | undefined>(undefined);

  useEffect(() => {
    if (selectedElement?.type === ItemTypes.PAGE) {
      setItem(pages.find((page) => page.id === selectedElement.id));
      setType(ItemTypes.PAGE);
    } else {
      if (selectedElement?.parentType === ItemTypes.PAGE) {
        const parent = pages.find((page) => page.id === selectedElement.parentId);
        setItem(parent?.controls.find(item => item.id === selectedElement.id))
      }
      setType(ItemTypes.FIELD);
    }
  }, [pages, selectedElement])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data: any = { ...item, [name]: value }
    setItem(data);
    if (selectedElement?.type === ItemTypes.PAGE) {
      updatePage(data);
    } else {
      updatePageControls(selectedElement?.parentId ?? '', data);
    }
  }, [item, selectedElement?.parentId, selectedElement?.type, updatePage, updatePageControls])

  const renderSetting = useCallback(() => {
    switch (type) {
      case ItemTypes.PAGE:
        return (
          <>
            <Typography>Page</Typography>
            <TextField 
              label="Title" 
              name="title"
              value={(item as Page)?.title} 
              sx={{ mt: 4 }}
              onChange={handleChange}
              fullWidth
            />
          </>
        );
      case ItemTypes.FIELD:
        return (
          <>
            <Typography>Field</Typography>
            <TextField 
              label="Label" 
              name="label"
              value={(item as Control)?.label} 
              sx={{ mt: 4 }}
              onChange={handleChange}
              fullWidth
            />
            <TextField 
              label="Placeholder" 
              name="placeholder"
              value={(item as Control)?.placeholder} 
              sx={{ mt: 4 }}
              onChange={handleChange}
              fullWidth
            />
          </>
        );
      default:
        return <></>;
    }
  }, [handleChange, item, type])

  return (
    <div className="item-properties">
      {selectedElement && renderSetting()}
    </div>
  )
}

export default ItemProperties