import { Handle, Position } from "reactflow"
import { useStore } from "../store/store";
import { ItemTypes } from "../constants/constants";
import { Typography } from "@mui/material";

const FormComponent = ({ data }) => {
  const { forms, setSelectedElement } = useStore();
  const form = forms.find((f) => f.id === data.id);
  return (
    <div onClick={() => setSelectedElement(data.id, ItemTypes.FORM, null, null)} className="form-node">
      <Handle type="target" position={Position.Left} />
      <div>
        <Typography>Form</Typography>
        <Typography variant="caption">Id: {form.id}</Typography>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default FormComponent