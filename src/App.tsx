import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './styles.css'
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Layout />
      </DndProvider>
    </div>
  );
}

export default App
