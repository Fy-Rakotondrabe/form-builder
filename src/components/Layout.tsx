import DropZone from "./Dropzone"
import ItemProperties from "./ItemProperties"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <DropZone />
      <ItemProperties />
    </div>
  )
}

export default Layout