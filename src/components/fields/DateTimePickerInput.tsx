import React, { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useStyles } from './style';
import moment, { Moment } from 'moment';

interface DateTimePickerInputProps {
  mode: 'date' | 'time';
  label: string;
  value: string;
}

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
  mode,
  label,
  value
}) => {
  const [date, setDate] = useState<Moment>(moment());
  const classes = useStyles();

  useEffect(() => {
    if (value) {
      const newDate = moment(value);
      setDate(newDate);
    }
  }, [value, mode]);

  return (
    <Box className={classes.container}>
      {mode === 'date' ? (
        <DatePicker
          value={date}
          label={label}
          renderInput={(params) => <TextField fullWidth InputProps={{ readOnly: true }} {...params} />}
          onChange={() => {}}
        />
      ) : (
        <TimePicker
          value={date}
          label={label}
          renderInput={(params) => <TextField fullWidth InputProps={{ readOnly: true }} {...params} />}
          onChange={() => {}}
        />
      )}
    </Box>
  );
};

export default DateTimePickerInput;
