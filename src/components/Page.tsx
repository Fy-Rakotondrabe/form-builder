import { FC, useEffect, useState } from "react"
import { useStore } from "../store/store";
import classNames from "classnames";
import { ItemTypes } from "../constants/constants";
import { useDrop } from "react-dnd";
import { renderControl } from "./renderControl";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { Control, Entity, Field, Page } from "../model";
import { useFormContext } from "../context/formContext";

interface PageProps {
  id: string
}

const PageComponent: FC<PageProps> = ({ id }) => {
  const { pages, entityNodes, setSelectedElement, setPageControls } = useStore();
  const [page, setPage] = useState<Page | undefined>();
  const [entity, setEntity] = useState<Entity | undefined>()
  const { edges } = useFormContext();

  useEffect(() => {
    const pageMatch = pages.find((page) => page.id === id);
    setPage(pageMatch);
    if (entityNodes.length && edges.length && pageMatch) {
      const pageEdges = edges.find((e) => e.target === pageMatch?.id)
      if (pageEdges) {
        const entityMatch = entityNodes.find(item => item.nodeId === pageEdges.source);
        setEntity(entityMatch);
      }
    }
  }, [edges, entityNodes, id, page, pages])

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: [ItemTypes.FIELD, ItemTypes.ACCORDION],
    drop: (item: Field, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.type === ItemTypes.ACCORDION && entity.displayType === 'Table') {
        throw 'Accordion can only be drop on page connected to an entity that have a List as display type'
      } else {
        setPageControls(page?.id ?? '', item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [page, entity]);

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