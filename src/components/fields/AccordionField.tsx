import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from '../../constants/constants';
import { AccordionControl, Control, Field, Page } from '../../model';
import { useStore } from '../../store/store';
import { renderControl } from '../renderControl';
import classNames from 'classnames';

interface AccordionFieldProps {
  label: string;
  id: string;
  pageId: string;
}

interface DropZoneProps {
  id: string;
  index: number;
  page: Page;
  accordion: AccordionControl;
}


const DropZone: FC<DropZoneProps> = ({ id, index, page, accordion }) => {
  const { updatePage } = useStore();

  const handleAddAccordionControl = useCallback((control: Control) => {
    const controls = [...accordion.controls];
    controls.splice(index, 0, control)
    const newAcc: AccordionControl = {
      ...accordion,
      controls: controls
    }
    updatePage({
      ...page,
      controls: page?.controls.map((c) => c.id === id ? newAcc : c)
    })
  }, [accordion, id, index, page, updatePage])

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD,
    drop: (item: Field, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const control: Control = {
        id: uuidv4(),
        type: item.type,
        label: item.label,
        value: '',
        placeholder: item.label,
        required: false,
        format: 'single',
        options: [],
      }
      
      handleAddAccordionControl(control);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [accordion, page]);

  return (
    <Box ref={drop} height={16} width={'100%'} className={classNames({ "over": isOverCurrent })}></Box>
  );
}


const AccordionField: FC<AccordionFieldProps> = ({
  label,
  id,
  pageId,
}) => {
  const { pages, setSelectedElement, setSelectedAccordionControl } = useStore();

  const page = useMemo(() => pages.find((item) => item.id === pageId), [pageId, pages])
  const accordion = useMemo(() => page?.controls.find((item) => item.id === id) as AccordionControl, [id, page?.controls])

  return (
    <Accordion 
      expanded
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id, ItemTypes.ACCORDION, page?.id, ItemTypes.PAGE)
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={16} fontWeight="bold">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DropZone index={0} id={id} accordion={accordion} page={page} />
        {accordion?.controls.map((control, index) => (
          <>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAccordionControl(page.id, id, control.id)
              }}
            >
              {renderControl(control as Control, page.id)}
            </div>
            <DropZone index={index + 1} id={id} accordion={accordion} page={page} />
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionField