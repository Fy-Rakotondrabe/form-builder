import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from '../../constants/constants';
import { AccordionControl, Control, Field } from '../../model';
import { useStore } from '../../store/store';
import { renderControl } from '../renderControl';

interface AccordionFieldProps {
  label: string;
  id: string;
  pageId: string;
}

const AccordionField: FC<AccordionFieldProps> = ({
  label,
  id,
  pageId,
}) => {
  const { pages, updatePage, setSelectedElement, setSelectedAccordionControl } = useStore();

  const page = useMemo(() => pages.find((item) => item.id === pageId), [pageId, pages])
  const accordion = useMemo(() => page?.controls.find((item) => item.id === id) as AccordionControl, [id, page?.controls])

  const handleAddAccordionControl = useCallback((control: Control) => {
    const newAcc: AccordionControl = {
      ...accordion,
      controls: [...accordion.controls, control]
    }
    updatePage({
      ...page,
      controls: page?.controls.map((c) => c.id === id ? newAcc : c)
    })
  }, [accordion, id, page, updatePage])
  
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
  }), [pages, accordion, page]);

  return (
    <Accordion 
      style={isOverCurrent ? { backgroundColor: 'aliceblue' } : {}} 
      sx={{ my: 2 }} 
      ref={drop} 
      expanded
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id, ItemTypes.ACCORDION, page?.id, ItemTypes.PAGE)
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={10}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {accordion?.controls.map((control) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAccordionControl(page.id, id, control.id)
            }}
          >
            {renderControl(control as Control, page.id)}
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionField