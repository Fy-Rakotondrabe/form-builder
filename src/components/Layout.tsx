import { FC } from "react"
import FlowSection from "./Flow"
import ItemProperties from "./ItemProperties"
import Sidebar from "./Sidebar"
import { Form } from "../model"

interface LayoutProps {
  onSave: (data: Form[]) => void;
  onError: (error: string) => void;
}

const Layout: FC<LayoutProps> = ({ onSave, onError }) => {
  return (
    <div className="layout">
      <Sidebar />
      <FlowSection onSave={onSave} onError={onError} />
      <ItemProperties />
    </div>
  )
}

export default Layout