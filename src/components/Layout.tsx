import { FC, useEffect } from "react"
import FlowSection from "./Flow"
import ItemProperties from "./ItemProperties"
import Sidebar from "./Sidebar"
import { Form } from "../model"
import { useFormContext } from "../context/formContext"

interface LayoutProps {
  value: Form[];
  onSave: (data: Form[]) => void;
  onError: (error: string) => void;
}

const Layout: FC<LayoutProps> = ({ value, onSave, onError }) => {
  const { init } = useFormContext();

  useEffect(() => {
    init(value)
  }, [init, value])
  
  return (
    <div className="layout">
      <Sidebar />
      <FlowSection onSave={onSave} onError={onError} />
      <ItemProperties />
    </div>
  )
}

export default Layout