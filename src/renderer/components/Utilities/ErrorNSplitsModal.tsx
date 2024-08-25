import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React, { useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styleButtonBigger, styleButtonBiggerRed } from '../VerPaciente/ButtonStyle';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'black',
};
export interface ModalProps {
    open: boolean;
    toggleModal: () => void;
    cancelModal: () => void;
    setKfolds: React.Dispatch<React.SetStateAction<string>>;
    kFolds: string;
    setPorcentaje: React.Dispatch<React.SetStateAction<string>>;
    porcentaje: string;


}

export default function ErrorNSplitsModal(props: ModalProps) {
  const { toggleModal, cancelModal, open, setKfolds, kFolds, setPorcentaje, porcentaje } = props;
  const [puerto, setPuerto] = React.useState('');
  const [baudRate, setBaudRate] = React.useState('9600');
  const [puerto2, setPuerto2] = React.useState('');
  const [baudRate2, setBaudRate2] = React.useState('9600');
  const [puertos, setPuertos] = React.useState([]);

  
  return (
    <div  
    >
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifique número diferente de K-Folds y/o de porcentaje de prueba
        </Typography>

        <TextField
            autoFocus
            margin="dense"
            label="K-Folds"
            type="text"
            fullWidth
            value={kFolds}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(event) => {
                // const num = parseInt(event.target.value, 10);
                setKfolds(event.target.value);
            } } />

        <TextField
            autoFocus
            margin="dense"
            label="porcentaje"
            type="text"
            fullWidth
            value={porcentaje}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(event) => {
                // const num = parseInt(event.target.value, 10);
                setPorcentaje(event.target.value);
            } } />
          <Button sx={styleButtonBigger} onClick={toggleModal}>
          Confirm
          </Button>
          <Button sx={styleButtonBiggerRed} onClick={cancelModal}>
          Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
