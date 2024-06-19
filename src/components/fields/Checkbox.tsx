import { useState, useEffect, FC } from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { useStyles } from './style';

interface CheckboxFieldProps {
  label: string;
  value: boolean;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  label,
  value,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  return (
    <Box className={classes.container}>
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={label}
      />
    </Box>
  );
};

export default CheckboxField;
