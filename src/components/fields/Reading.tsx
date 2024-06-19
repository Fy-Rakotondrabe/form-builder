import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, TextField, Typography } from '@mui/material';
import { FC } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TimePicker } from '@mui/x-date-pickers';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import moment from 'moment';

interface ReadingProps {
  value: any;
  format: string;
  index: number;
  suffix?: string;
  label: string;
}

const Reading: FC<ReadingProps> = ({
  value,
  format,
  index,
  suffix,
  label,
}) => {
  return (
    <Accordion sx={{ my: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={10}>{label} {index}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <TimePicker
            onChange={(v) => console.log(v)}
            value={moment()}
            label={"Time"}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          <Box mt={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
            <TextField
              label={"Value"}
              variant="outlined"
              fullWidth
              value={value}
              type={format}
              InputProps={suffix ? { endAdornment: <span>{suffix}</span> } : {}}
            />
            {format === 'number' && (
              <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                <IconButton size='large'>
                  <AddCircleOutline fontSize='medium' />
                </IconButton>
                <IconButton size='large'>
                  <RemoveCircleOutline fontSize='medium' />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Reading