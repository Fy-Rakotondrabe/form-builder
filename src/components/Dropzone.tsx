import { useDrop } from "react-dnd"
import { ElementTypes, ItemTypes } from "../constants/constants"
import { useState } from "react";
import { Element } from "../model";
import PageComponent from "./Page";
import { v4 as uuidv4 } from 'uuid';
import { useStore } from "../store/store";
import classNames from "classnames";

const renderItem = (element: Element) => {
  switch (element.type) {
    case ElementTypes.PAGE:
      return <PageComponent id={element.id!} />
    default:
      return null;
  }
}

const DropZone = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const { setPage } = useStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PAGE,
    drop: (item: Element, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const id = uuidv4();
      const newElement = {
        ...item,
        id,
      }

      setPage(id);
      setElements((s) => ([...s, newElement]))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), []);

  return (
    <div ref={drop} className={classNames("dropzone", { "over": isOver })}>
      {elements.length > 0 ? elements.map(element => renderItem(element)) : "Drop items here"}
    </div>
  )
}

export default DropZone
