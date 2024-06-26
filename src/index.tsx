import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { FC, useEffect } from "react";
import Layout from "./components/Layout";
import { Entity, Form } from "./model";
import { useStore } from "./store/store";
import './index.css'
import 'reactflow/dist/style.css';
import './index.css';
import { FormProvider } from './context/formContext';

interface FormBuilderProps {
  value: Form[];
  entities: Entity[];
  entityType: string[];
  onSave: (data: Form[]) => void;
  onError: (error: string) => void;
}

const FormBuilder: FC<FormBuilderProps> = ({ value, entities, entityType, onSave, onError }) => {
  const { setEntities, setEntityType } = useStore();

  useEffect(() => {
    setEntities(entities);
    setEntityType(entityType);
  }, [entities, entityType, setEntities, setEntityType]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DndProvider backend={HTML5Backend}>
        <FormProvider>
          <Layout value={value} onSave={onSave} onError={onError} />
        </FormProvider>
      </DndProvider>
    </LocalizationProvider>
  );
}

export default FormBuilder

