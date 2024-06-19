import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SnackbarProvider } from 'notistack'

import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect } from "react";
import FormBuilder from "./components/FormBuilder";
import { Entity } from "./model";
import { useStore } from "./store/store";
import './styles.css';
import { FormProvider } from './context/formContext';

const entities: Entity[] = [
  {name: 'Percolation', id: 'azerty-123'},
  {name: 'Wet Concrete', id: 'qwerty-123'},
]

function App() {
  const { setEntities } = useStore();

  useEffect(() => {
    setEntities(entities);
  }, [setEntities]);

  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DndProvider backend={HTML5Backend}>
          <FormProvider>
            <FormBuilder />
          </FormProvider>
        </DndProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}

export default App
