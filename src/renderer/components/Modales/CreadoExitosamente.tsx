/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useState } from 'react';
import styleButton from '../VerPaciente/ButtonStyle';
import { setIsUploaded } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setFlagCredentials } from '../../../redux/slices/LoginSlice';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#7fe706',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'white',
};

export default function CreadoExitosamente() {
  const [open, setOpen] = useState(true);
  const flagCredentials = useCustomSelector(
    (state) => state.login.flagCredentials
  );

  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */
  const appDispatch = useCustomDispatch();
  const toggleModal = () => {
    setOpen(!open);
    appDispatch(setIsUploaded(false));
    if (flagCredentials) {
      appDispatch(setFlagCredentials(false));

    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Successfully saved
          </Typography>
          <Button sx={styleButton} onClick={toggleModal}>Continue</Button>
        </Box>
      </Modal>
    </div>
  );
}
