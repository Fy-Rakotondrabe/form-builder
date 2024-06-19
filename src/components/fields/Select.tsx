import { Box, Typography, Chip } from '@mui/material';
import { useStyles } from './style';

interface SelectComponentProps {
  label: string;
  format: 'single' | 'multiple';
  options: string[];
  value: string[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  format,
  options,
  value,
}) => {
  const classes = useStyles();

  return (
    <Box my={2}>
      <Typography>{label}</Typography>
      <Box className={classes.multipleChoice}>
        {format === 'single'
          ? (options ?? []).map(option => (
              <Chip
                key={option}
                label={option}
                color={value ? (value[0] === option ? 'primary' : 'default') : 'default'}
              />
            ))
          : (options ?? []).map(option => (
              <Chip
                key={option}
                label={option}
                color={(value ?? []).includes(option) ? 'primary' : 'default'}
              />
            ))}
      </Box>
    </Box>
  );
};

export default SelectComponent;
