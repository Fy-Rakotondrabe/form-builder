import { FC, useEffect, useState } from "react"
import { useStore } from "../store/store";
import classNames from "classnames";
import { ItemTypes } from "../constants/constants";
import { useDrop } from "react-dnd";
import { renderControl } from "./renderControl";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { AccordionControl, Control, Entity, Field, Page } from "../model";
import { useFormContext } from "../context/formContext";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from 'uuid';

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
  const {enqueueSnackbar} = useSnackbar();
  const { pages, entityNodes, setSelectedElement, selectedElement, updatePage } = useStore();
  const [page, setPage] = useState<Page | undefined>();
  const [entity, setEntity] = useState<Entity | undefined>()
  const { edges } = useFormContext();
  const [dataToCopy, setDataToCopy] = useState<Control | AccordionControl | null>(null);
  const [dataToCopyIndex, setDataToCopyIndex] = useState(-1);

  useEffect(() => {
    const moveControl = (direction) => {
      if (!selectedElement) return;

      const controlIndex = page?.controls.findIndex((item) => item.id === selectedElement.id);
      if (controlIndex === -1) return;

      const newIndex = controlIndex + direction;
      if (newIndex < 0 || newIndex >= page.controls.length) return;

      const newControls = [...page.controls];
      const [movedControl] = newControls.splice(controlIndex, 1);
      newControls.splice(newIndex, 0, movedControl);

      updatePage({
        ...page,
        controls: newControls
      });

      // setSelectedElement(movedControl);
    };
    const handleKeyDown = (event) => {
      // Check if Ctrl or Cmd is pressed along with C or V
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'c':
            if (selectedElement) {
              const controlIndex = page?.controls.findIndex((item) => item.id === selectedElement.id);
              const control = page?.controls[controlIndex];
              setDataToCopy(control);
              setDataToCopyIndex(controlIndex);
              enqueueSnackbar('Please select a page to paste the field and press (cmd / ctrl) + V', { preventDuplicate: true });
            }
            break;
          case 'v':
            if (dataToCopy && selectedElement.type === ItemTypes.PAGE) {
              const pageDest = pages.find(p => p.id === selectedElement.id); 
              const newControl = {
                ...dataToCopy,
                id: uuidv4(),
                label: dataToCopy.label + ' (copy)'
              }

              if (typeof dataToCopy === 'object' && 'controls' in dataToCopy) {
                (newControl as AccordionControl).controls = (newControl as AccordionControl).controls.map(control => ({ ...control, id: uuidv4() }))
              }

              const pageControls = [...pageDest.controls, newControl];
              updatePage({
                ...pageDest,
                controls: pageControls
              })
            }
            break;
          default:
            break;
        }
      } else {
        switch (event.key) {
          case 'ArrowUp':
            moveControl(-1);
            break;
          case 'ArrowDown':
            moveControl(1);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dataToCopy, dataToCopyIndex, enqueueSnackbar, page, pages, selectedElement, setPage, setSelectedElement, updatePage]);

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
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(control.id, ItemTypes.FIELD, page.id, ItemTypes.PAGE)
              }}
              className={classNames({selected: selectedElement?.id === control.id})}
            >
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