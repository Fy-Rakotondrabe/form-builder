import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { SnackbarProvider } from 'notistack';
import { FC, useEffect } from "react";
import 'reactflow/dist/style.css';
import Layout from "./components/Layout";
import { FormProvider } from './context/formContext';
import './index.css';
import { Entity, Form } from "./model";
import { useStore } from "./store/store";

interface FormBuilderProps {
  value: Form[];
  entities: Entity[];
  onSave: (data: Form[]) => void;
  onError: (error: string) => void;
}

const FormBuilder: FC<FormBuilderProps> = ({ value, entities, onSave, onError }) => {
  const { setEntities } = useStore();

  useEffect(() => {
    setEntities(entities);
  }, [entities, setEntities]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SnackbarProvider>
        <DndProvider backend={HTML5Backend}>
          <FormProvider>
            <Layout value={value} onSave={onSave} onError={onError} />
          </FormProvider>
        </DndProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default FormBuilder

