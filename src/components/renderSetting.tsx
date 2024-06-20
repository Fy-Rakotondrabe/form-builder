import { Autocomplete, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
    label,
    formula,
    index,
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
          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="format-select-label">Format</InputLabel>
            <Select
              labelId="format-select-label"
              id="format-select"
              value={format}
              label="Format"
              onChange={(e) => handleChange({ target: { name: 'format', value: e.target.value } } as any)}
            >
              <MenuItem value={'short'}>Short</MenuItem>
              <MenuItem value={'multi-line'}>Multi Line</MenuItem>
            </Select>
          </FormControl>
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
    case 'reading':
      return (
        <>
          <Typography>Reading</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Reading rank" 
            name="index"
            value={index} 
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
    case 'checkbox':
      return (
        <>
          <Typography>Checkbox</Typography>
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
                checked={!!value} 
                onChange={(e) => handleChange({ target: { name: 'value', value: e.target.checked } } as any)}
              />
            }  
            label="Value" 
          />
        </>
      );
    case 'geolocation':
      return (
        <>
          <Typography>Geolocation</Typography>
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
    case 'barcode-scan':
      return (
        <>
          <Typography>Barcode Scan</Typography>
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
            label="Prefix" 
            name="prefix"
            value={prefix} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField 
            label="Suffix" 
            name="suffix"
            value={suffix} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="format-select-label">Format</InputLabel>
            <Select
              labelId="format-select-label"
              id="format-select"
              value={format}
              label="Format"
              onChange={(e) => handleChange({ target: { name: 'format', value: e.target.value } } as any)}
            >
              <MenuItem value={'decimal'}>Decimal</MenuItem>
              <MenuItem value={'integer'}>Integer</MenuItem>
            </Select>
          </FormControl>
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
    case 'choice':
      return (
        <>
          <Typography>Multiple Choice</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            options={options ?? []}
            getOptionLabel={(option) => option}
            defaultValue={options ?? []}
            onChange={(_, newValue) => handleChange({ target: { name: 'options', value: newValue } } as any)}
            freeSolo
            sx={{ mt: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Options"
                placeholder="Options"
              />
            )}
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
    case 'photo':
      return (
        <>
          <Typography>Photo</Typography>
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
    case 'calculated':
      return (
        <>
          <Typography>Calculated</Typography>
          <TextField
            label="Label" 
            name="label"
            value={label} 
            sx={{ mt: 4 }}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Formula [field1] + [field2]" 
            name="formula"
            placeholder="[field1] + [field2]"
            value={formula} 
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
    default:
      return <></>;
  }
}