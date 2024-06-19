import React, { useEffect, FC, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useStyles } from './style';

interface DigitalSignatureProps {
  label: string;
  value: string;
}

const DigitalSignature: FC<DigitalSignatureProps> = ({
  label,
  value,
}) => {
  const classes = useStyles();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setPin(value);
  }, [value]);

  const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d{0,4}$/.test(input)) {
      setPin(input);
      setError('');
    } else {
      setError('Pin must be a 4-digit number');
    }
  };

  return (
    <Box my={3}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={pin}
        onChange={handlePinChange}
        inputProps={{ maxLength: 4 }}
        error={!!error}
        InputProps={{ readOnly: true }} 
        type="number"
      />
      {error && <Typography className={classes.errorText}>{error}</Typography>}
    </Box>
  );
};

export default DigitalSignature;
