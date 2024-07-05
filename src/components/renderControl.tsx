import { TextField as MUITextField, InputAdornment, Box } from '@mui/material';
import BarcodeScanner from './fields/BarCodeScanner';
import CalculatedField from './fields/CalculatedField';
import CheckboxField from './fields/Checkbox';
import DateTimePickerInput from './fields/DateTimePickerInput';
import ImageInput from './fields/ImageInput';
import LocationInput from './fields/LocationInput';
import SelectComponent from './fields/Select';
import TextField from './fields/TextField';
import { Control } from '../model';
import AccordionField from './fields/AccordionField';

export function renderControl(
  control: Control,
  pageId: string,
) {  
  const {
    type,
    format,
    options,
    placeholder,
    suffix,
    prefix,
    required,
    value,
    index,
    id,
  } = control;

  const label = required ? `${control.label} *` : control.label;

  switch (type) {
    case 'text':
    case 'markdown':
      return (
        <TextField
          label={label}
          placeholder={placeholder}
          multiline={format === 'multi-line'}
          style={format === 'multi-line' ? { height: 100, marginBottom: 24 } : {}}
          rows={format === 'multi-line' ? 4 : 0}
          variant="outlined"
          value={value}
          sx={{ my: 1 }}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField label={label ?? ''} value={value} />
      );
    case 'geolocation':
      return (
        <LocationInput label={label ?? ''} value={value} />
      );
    case 'barcode-scan':
      return (
        <BarcodeScanner
          label={label ?? ''}
          value={value}
        />
      );
    case 'numeric':
      return (
        <MUITextField
          label={label}
          placeholder={placeholder}
          type={format === 'integer' ? 'number' : 'text'}
          InputProps={{
            startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
            endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
          }}
          variant="outlined"
          value={value?.toString()}
          fullWidth
          sx={{ my: 1 }}
        />
      );
    case 'choice':
      return (
        <SelectComponent
          label={label ?? ''}
          format={format as any}
          options={options ?? []}
          value={value}
        />
      );
    case 'date-picker':
      return (
        <DateTimePickerInput
          mode="date"
          label={label ?? ''}
          value={value}
        />
      );
    case 'time-picker':
      return (
        <DateTimePickerInput
          mode="time"
          label={label ?? ''}
          value={value}
        />
      );
    case 'photo':
      return (
        <ImageInput
          type={'basic'}
          value={value}
        />
      );
    case 'calculated':
      return (
        <CalculatedField
          label={label ?? ''}
        />
      );
    case 'accordion':
      return (
        <Box sx={{ my: 2 }}>
          <AccordionField
            label={label ?? ''}
            pageId={pageId}
            id={id}
          />
        </Box>
      );
    default:
      return null;
  }
}
