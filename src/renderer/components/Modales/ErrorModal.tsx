/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useState } from 'react';
import { styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';
import { setFallosAlCargar } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#d0312d',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'white',
};

export default function ErrorModal() {
  const [open, setOpen] = useState(true);
  const appDispatch = useCustomDispatch();
  const msg = useCustomSelector((state) => state.status.errorDetails)
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */
  const toggleModal = () => {
    setOpen(!open);
    appDispatch(setFallosAlCargar(false));
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
            An error happened
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {msg}
          </Typography>
          <Button sx={styleButtonBiggerRed} onClick={toggleModal}>Continue</Button>
        </Box>
      </Modal>
    </div>
  );
}