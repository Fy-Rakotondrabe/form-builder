import FormSection from "./Flow"
import ItemProperties from "./ItemProperties"
import Sidebar from "./Sidebar"

const FormBuilder = () => {
  return (
    <div className="layout">
      <Sidebar />
      <FormSection />
      <ItemProperties />
    </div>
  )
}

export default FormBuilder