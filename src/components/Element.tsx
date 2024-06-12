import { FC } from "react"
import { Element } from "../model"
import { useDrag } from "react-dnd"

interface ElementProps {
  element: Element
}

const ElementItem: FC<ElementProps> = ({ element }) => {
  const [, drag] = useDrag(() => ({
    type: element.elementType,
    item: element,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div ref={drag} className="sidebar-item" key={element.type}>{element.label}</div>
  )
}

export default ElementItem