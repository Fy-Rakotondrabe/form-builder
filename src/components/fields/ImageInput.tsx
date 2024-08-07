import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Camera, Image } from '@mui/icons-material';

interface ImageInputProps {
  type: 'basic' | 'table';
  value: string;
  label: string;
}

const ImageInput: React.FC<ImageInputProps> = ({label}) => {
  return (
    <Box>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontSize={10}>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly">
            <Paper sx={{ p: 1, height: 100, width: 100 }}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly">
                <Camera fontSize={'large'} />
                <Typography align='center' fontSize={10}>Take Photo</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 1, height: 100, width: 100 }}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly">
                <Image fontSize='large' />
                <Typography align='center' fontSize={10}>Choose From Gallery</Typography>
              </Box>
            </Paper>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ImageInput;
