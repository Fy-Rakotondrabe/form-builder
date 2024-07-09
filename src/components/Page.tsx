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
import { useSnackbar } from "notistack";

interface PageProps {
  id: string;
}

interface DropZoneProps {
  page: Page;
  entity: Entity;
  index: number;
}

const DropZone: FC<DropZoneProps> = ({ page, entity, index }) => {
  const { setPageControls } = useStore()
  const { enqueueSnackbar } = useSnackbar()

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: [ItemTypes.FIELD, ItemTypes.ACCORDION],
    drop: (item: Field, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.type === ItemTypes.ACCORDION && entity.displayType === 'Table') {
        enqueueSnackbar('Accordion can only be drop on page connected to an entity that have a List as display type', { variant: 'error' })
      } else {
        setPageControls(page?.id ?? '', item, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [page, entity]);

  return (
    <Box ref={drop} height={16} width={'100%'} className={classNames({ "over": isOverCurrent })}></Box>
  );
}

const PageComponent: FC<PageProps> = ({ id }) => {
  const { pages, entityNodes, setSelectedElement } = useStore();
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

  if (!page) return <></>;

  return (
    <div className="page" onClick={() => setSelectedElement(page.id, ItemTypes.PAGE, null, null)}>
      <Handle type="target" position={Position.Left} />
      {page?.pageName}
      <Box sx={{ mt: 3 }}>
        <DropZone index={0} entity={entity} page={page} />
        {page?.controls.map((control, index) => (
          <>
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedElement(control.id, ItemTypes.FIELD, page.id, ItemTypes.PAGE)
            }}>
              {renderControl(control as Control, page.id)}
            </div>
            <DropZone index={index + 1} entity={entity} page={page} />
          </>
        ))}
      </Box>
    </div>
  )
}

export default PageComponent