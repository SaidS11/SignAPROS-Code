import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styleButtonBigger } from '../VerPaciente/ButtonStyle';

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
  toggleModal: () => void;
  open: boolean;
  setSensoresSelected: React.Dispatch<React.SetStateAction<number>>;
  setPortSelected: React.Dispatch<React.SetStateAction<string>>;
  setBaudSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function ModalSensores(props: ModalProps) {
  const {
    toggleModal,
    open,
    setSensoresSelected,
    setPortSelected,
    setBaudSelected,
  } = props;
  const [sensores, setSensores] = React.useState('');
  const [puerto, setPuerto] = React.useState('');
  const [baudRate, setBaudRate] = React.useState('9600');
  const [puertos, setPuertos] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    console.log(num);
    setSensores(event.target.value as string);
    setSensoresSelected(num);
  };

  const handleChangePuerto = (event: SelectChangeEvent) => {
    console.log('puerto', event.target.value as string);
    setPuerto(event.target.value as string);
    setPortSelected(event.target.value as string);

    // setPuerto("COM1");

    // setPortSelected("COM1");
  };

  // const handleChangeBaud = () => {
  //   const num = parseInt(event.target.value, 10);
  //   setBaudRate(event.target.value as string);
  //   setBaudSelected(num)
  // };
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */

  const cargarPuertos = () => {
    window.Bridge.cargarPuertos();
  };
  window.Bridge.cargarP((event: any, ports: any) => {
    const nombresSet = ports;
    console.log('reading', ports);
    const select: any = [];
    for (let i = 0; i < nombresSet.length; i += 1) {
      // select.push(<MenuItem value={nombresSet[i].path}>{nombresSet[i].path}</MenuItem>)
      select.push(
        <MenuItem key={nombresSet[i].path} value={nombresSet[i].path}>
          {nombresSet[i].friendlyName}
        </MenuItem>
      );
    }
    setPuertos(select);
  });
  useEffect(() => {
    cargarPuertos();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        // onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seleccione la cantidad de sensores/EMG
          </Typography>
          <br />
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sensores</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sensores}
                label="Sensores"
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Puertos</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={puerto}
                label="Puertos"
                onChange={handleChangePuerto}
              >
                {puertos}
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <TextField
              autoFocus
              margin="dense"
              label="BaudRate"
              type="text"
              fullWidth
              value={baudRate}
              onChange={(event) => {
                const num = parseInt(event.target.value, 10);
                setBaudRate(event.target.value as string);
                setBaudSelected(num);
              }}
            />
          </div>
          <br />
          <Button sx={styleButtonBigger} onClick={toggleModal}>
          Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
