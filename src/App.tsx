import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import './styles.css'
import Layout from "./components/Layout";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DndProvider backend={HTML5Backend}>
        <Layout />
      </DndProvider>
    </LocalizationProvider>
  );
}

export default App
