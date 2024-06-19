import React, { FC, useCallback, useEffect, useState } from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps, Box, Typography } from '@mui/material';
import { useStyles } from './style';

interface TextFieldProps extends Omit<MUITextFieldProps, 'required'> {
  required?: boolean;
  edited?: boolean;
}

const TextField: FC<TextFieldProps> = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  }, []);

  useEffect(() => {
    setText(props.value as string)
  }, [props.value])

  useEffect(() => {
    if (props.required && props.edited) {
      if (text.trim() === '') {
        setError('This field is required');
      } else {
        setError('');
      }
    }
  }, [text, props.required, props.edited]);

  return (
    <Box className={classes.container}>
      <MUITextField
        {...props}
        value={text}
        onChange={handleChange}
        error={!!error}
        fullWidth
        helperText={error || props.helperText}
        InputProps={{ readOnly: true }} 
      />
      {error && <Typography className={classes.errorText}>{error}</Typography>}
    </Box>
  );
};

export default TextField;
