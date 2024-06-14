import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import './styles.css'
import FormBuilder from "./components/FormBuilder";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Entity } from "./model";
import { useStore } from "./store/store";
import { useEffect } from "react";

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
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DndProvider backend={HTML5Backend}>
        <FormBuilder />
      </DndProvider>
    </LocalizationProvider>
  );
}

export default App
