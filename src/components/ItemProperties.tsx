import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/store"
import { ItemTypes } from "../constants/constants";
import { TextField, Typography } from "@mui/material";
import { Control, Page } from "../model";
import { renderSetting } from "./renderSetting";

const ItemProperties = () => {
  const { selectedElement, pages, updatePage, updatePageControls } = useStore();
  const [type, setType] = useState(ItemTypes.PAGE);
  const [item, setItem] = useState<Page | Control | undefined>(undefined);

  useEffect(() => {
    setType(selectedElement?.type as any);

    if (selectedElement?.type === ItemTypes.PAGE) {
      setItem(pages.find((page) => page.id === selectedElement.id));
    } else {
      if (selectedElement?.parentType === ItemTypes.PAGE) {
        const parent = pages.find((page) => page.id === selectedElement.parentId);
        setItem(parent?.controls.find(item => item.id === selectedElement.id))
      }
    }
  }, [pages, selectedElement])

  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    const data: any = { ...item, [name]: value }
    setItem(data);
    if (selectedElement?.type === ItemTypes.PAGE) {
      updatePage(data);
    } else {
      updatePageControls(selectedElement?.parentId ?? '', data);
    }
  }, [item, selectedElement?.parentId, selectedElement?.type, updatePage, updatePageControls])

  const renderSettingView = useCallback(() => {
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
        return renderSetting(item as Control, handleChange);
      default:
        return <></>;
    }
  }, [handleChange, item, type])

  return (
    <div className="item-properties">
      {selectedElement && renderSettingView()}
    </div>
  )
}

export default ItemProperties