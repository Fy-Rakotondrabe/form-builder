import { FC, useEffect, useState } from "react"
import { useStore } from "../store/store";
import classNames from "classnames";
import { ItemTypes } from "../constants/constants";
import { useDrop } from "react-dnd";
import { renderControl } from "./renderControl";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { Control, Field, Page } from "../model";

interface PageProps {
  id: string
}

const PageComponent: FC<PageProps> = ({ id }) => {
  const { pages, setSelectedElement, setPageControls } = useStore();
  const [page, setPage] = useState<Page | undefined>();

  useEffect(() => {
    const match = pages.find((page) => page.id === id);
    setPage(match);
  }, [id, pages])

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: [ItemTypes.FIELD, ItemTypes.ACCORDION],
    drop: (item: Field, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setPageControls(page?.id ?? '', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [page]);

  if (!page) return <></>;

  return (
    <div 
      ref={drop}
      onClick={() => setSelectedElement(page.id, ItemTypes.PAGE, null, null)} 
      className={classNames("page", { "over": isOverCurrent })}
    >
      <Handle type="target" position={Position.Left} />
      {page?.pageName}
      <Box sx={{ mt: 3 }}>
        {page?.controls.map((control) => (
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(control.id, ItemTypes.FIELD, page.id, ItemTypes.PAGE)
          }}>
            {renderControl(control as Control, page.id)}
          </div>
        ))}
      </Box>
    </div>
  )
}

export default PageComponent