import { FC, useEffect, useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const useStyles = makeStyles({
  inputDefaultStyle: {
    marginBottom: '16px',
  },
});

interface LocationInputProps {
  label: string;
  value: string;
}

const LocationInput: FC<LocationInputProps> = ({ label, value }) => {
  const classes = useStyles();
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setLocation(value);
  }, [value]);

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      className={classes.inputDefaultStyle}
      value={location}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <IconButton>
            <MyLocationIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default LocationInput;
