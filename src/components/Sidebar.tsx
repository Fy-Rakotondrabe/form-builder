import { Elements } from "../constants/constants"
import ElementItem from "./Element"

const Sidebar = () => {
  return (
    <div className="sidebar">
      {Elements.map((element) => (
        <ElementItem key={element.type} element={element} />
      ))}
    </div>
  )
}

export default Sidebar