import { FC, useEffect, useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
interface LocationInputProps {
  label: string;
  value: string;
}

const LocationInput: FC<LocationInputProps> = ({ label, value }) => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setLocation(value);
  }, [value]);

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
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
