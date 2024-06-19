import TextField from '@mui/material/TextField';
import { useStyles } from './style';

interface CalculatedFieldProps {
  label: string;
}

const CalculatedField: React.FC<CalculatedFieldProps> = ({
  label,
}) => {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      className={classes.inputDefaultStyle}
      InputProps={{
        readOnly: true,
      }}
      value={'0'}
    />
  );
};

export default CalculatedField;
