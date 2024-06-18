import { Elements } from "../constants/constants"
import ElementItem from "./Element"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        {Elements.map((element) => (
          <ElementItem key={element.type} element={element} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar