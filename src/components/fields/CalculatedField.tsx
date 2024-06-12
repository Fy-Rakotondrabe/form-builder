import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useStyles } from './style';

interface CalculatedFieldProps {
  label: string;
}

const CalculatedField: React.FC<CalculatedFieldProps> = ({
  label,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
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
    </Box>
  );
};

export default CalculatedField;
