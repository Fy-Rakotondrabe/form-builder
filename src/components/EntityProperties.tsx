import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import { Control, Entity } from '../model';
import { FC, useCallback, useState } from 'react';
import { useStore } from '../store/store';
import { ItemTypes } from '../constants/constants';
import { useFormContext } from '../context/formContext';

interface EntityPropertiesProps {
  handleChange: (e: React.ChangeEvent<any>) => void;
  item: Entity;
}

const EntityProperties: FC<EntityPropertiesProps> = ({
  handleChange,
  item
}) => {
  const { edges } = useFormContext();
  const { entities, pages, updatePage } = useStore();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  const confirm = useCallback(() => {
    handleChange({ target: { name: 'displayType', value: selectValue } } as any)

    const pageEdgesTarget = edges.filter(edge => edge.source === item.nodeId).map(e => e.target);
    const matchPages = pages.filter(p => pageEdgesTarget.includes(p.id));
    matchPages.forEach(page => {
      updatePage({
        ...page,
        controls: page.controls.filter((c: Control) => c.type !== ItemTypes.ACCORDION)
      })
    })
    setSelectValue(null);
    setOpenConfirmation(false);
  }, [edges, handleChange, item.nodeId, pages, selectValue, updatePage])

  const cancel = useCallback(() => {
    setSelectValue(null);
    setOpenConfirmation(false);
  }, [])

  return (
    <>
      <Typography>Entity</Typography>
      <Select
        value={(item as Entity)?.id}
        onChange={handleChange}
        fullWidth
        name="id"
        sx={{ mt: 4 }}
      >
        {entities.map((entity) => (
          <MenuItem value={entity.id}>{entity.name}</MenuItem>
        ))}
      </Select>
      <FormControl sx={{ mt: 4 }} fullWidth>
        <InputLabel id="type">Display Type</InputLabel>
        <Select
          value={(item as Entity)?.displayType}
          onChange={(e) => {
            if (e.target.value === 'Table') {
              setSelectValue(e.target.value)
              setOpenConfirmation(true);
            } else {
              handleChange(e as any);
            }
          }}
          fullWidth
          name="displayType"
          label="Display Type"
          labelId="type"
        >
          {["Table", "List"].map((entity) => (
            <MenuItem value={entity}>{entity}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you chose Table, all the accordion inside all the page connected to this entity will be removed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancel()}>Cancel</Button>
          <Button onClick={() => confirm()} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EntityProperties;
