import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Box, Typography, Modal } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useStyles } from './style';

interface BarcodeScannerProps {
  label: string;
  value: string;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  label,
  value
}) => {
  const classes = useStyles();
  const [show, setShow] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    setDisplayText(value);
  }, [value]);

  return (
    <Box my={3}>
      <TextField
        label={label}
        className={classes.inputDefaultStyle}
        variant="outlined"
        value={displayText}
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={() => setShow(!show)}>
              <CameraAltIcon />
            </IconButton>
          ),
        }}
      />
      <Modal
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="barcode-scanner-modal"
        aria-describedby="barcode-scanner-description"
      >
        <Box className={classes.modalContent}>
          <Typography id="barcode-scanner-description">
            The barcode scanner will appear here
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default BarcodeScanner;
