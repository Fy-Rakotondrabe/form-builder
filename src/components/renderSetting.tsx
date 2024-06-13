import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Control } from "../model";

export function renderSetting(
  control: Control,
  handleChange: (e: React.ChangeEvent<any>) => void,
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
    label
  } = control;

  switch (type) {
    case 'text':
    case 'markdown':
      return (
        <>
          <Typography>Text</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField 
            label="Placeholder" 
            name="placeholder"
            value={placeholder} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField 
            label="Default Value" 
            name="value"
            value={value} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel  
            sx={{ mt: 2 }}
            control={
              <Checkbox 
                checked={!!required} 
                onChange={(e) => handleChange({ target: { name: 'required', value: e.target.checked } } as any)}
              />
            }  
            label="Required" 
          />
        </>
      );
    // case 'reading':
    //   return (
    //     <Reading index={index} label={label ?? ''} format={format} suffix={suffix} value={value} subValue={subValue} />
    //   );
    // case 'checkbox':
    //   return (
    //     <CheckboxField label={label ?? ''} value={value} />
    //   );
    // case 'geolocation':
    //   return (
    //     <LocationInput label={label ?? ''} value={value} />
    //   );
    // case 'barcode-scan':
    //   return (
    //     <BarcodeScanner
    //       label={label ?? ''}
    //       value={value}
    //     />
    //   );
    // case 'digital-signature':
    //   return (
    //     <DigitalSignature
    //       label={label ?? ''}
         
    //       value={value}
    //     />
    //   );
    case 'numeric':
      return (
        <>
          <Typography>Numeric</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField 
            label="Placeholder" 
            name="placeholder"
            value={placeholder} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField 
            label="Default Value" 
            name="value"
            value={value} 
            sx={{ mt: 4 }}
            type="number"
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel  
            sx={{ mt: 2 }}
            control={
              <Checkbox 
                checked={!!required} 
                onChange={(e) => handleChange({ target: { name: 'required', value: e.target.checked } } as any)}
              />
            }  
            label="Required" 
          />
        </>
      );
    // case 'multiple-choice':
    //   return (
    //     <SelectComponent
    //       label={label ?? ''}
    //       format={format as any}
    //       options={options ?? []}
    //       value={value}
         
    //     />
    //   );
    case 'date-picker':
      return (
        <>
          <Typography>Date</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel  
            sx={{ mt: 2 }}
            control={
              <Checkbox 
                checked={!!required} 
                onChange={(e) => handleChange({ target: { name: 'required', value: e.target.checked } } as any)}
              />
            }  
            label="Required" 
          />
        </>
      );
    case 'time-picker':
      return (
        <>
          <Typography>Time</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel  
            sx={{ mt: 2 }}
            control={
              <Checkbox 
                checked={!!required} 
                onChange={(e) => handleChange({ target: { name: 'required', value: e.target.checked } } as any)}
              />
            }  
            label="Required" 
          />
        </>
      );
    // case 'photo':
    //   return (
    //     <ImageInput
    //       type={tableId === '' ? 'basic' : 'table'}
    //       value={value}
    //     />
    //   );
    // case 'calculated':
    //   return (
    //     <CalculatedField
    //       label={label ?? ''}
    //     />
    //   );
    default:
      return <></>;
  }
}