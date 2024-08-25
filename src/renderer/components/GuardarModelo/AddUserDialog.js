/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

const initialModel = {
  col1: '',
  col2: '',
  col3: '',
  col4: '',
  col5: {},
};

const AddUserDialog = (props) => {
  const { addUserHandler, selectedProtocol, algoritmo } = props;
  const [modelo, setModelo] = useState(initialModel);
  const [open, setOpen] = React.useState(false);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = (event) => {
    // setModelo({ ...modelo, ['col3']: selectedProtocol })
    // setModelo({ ...modelo, ['col4']: "false" })

    // setModelo({ ...modelo, ['col5']: "N/A" })
    console.log('Algo', algoritmo);
    modelo.col2 = algoritmo;
    modelo.col3 = selectedProtocol;
    modelo.col4 = 'false';
    modelo.col5 = 'N/A';

    addUserHandler(modelo);
    setModelo(initialModel);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange =
    (name) =>
    ({ target: { value } }) => {
      setModelo({ ...modelo, [name]: value });
    };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Model</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a name.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={modelo.nombre}
            onChange={handleChange('col1')}
          />
        </DialogContent>
        <DialogActions>
          {/* <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip> */}
          <Button onClick={handleClose} color="secondary">
          Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  algoritmo: PropTypes.string.isRequired,
};

export default AddUserDialog;
