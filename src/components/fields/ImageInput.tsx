import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Camera, Image } from '@mui/icons-material';

interface ImageInputProps {
  type: 'basic' | 'table';
  value: string;
}

const ImageInput: React.FC<ImageInputProps> = () => {
  return (
    <Box>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontSize={10}>Photo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly">
            <Paper sx={{ p: 2, height: 80, width: 80 }}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly">
                <Camera fontSize={'large'} />
                <Typography align='center' fontSize={10}>Take Photo</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, height: 80, width: 80 }}>
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
