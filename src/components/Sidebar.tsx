import { Button } from "@mui/material"
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
      <Button variant="contained" fullWidth>
        Save
      </Button>
    </div>
  )
}

export default Sidebar