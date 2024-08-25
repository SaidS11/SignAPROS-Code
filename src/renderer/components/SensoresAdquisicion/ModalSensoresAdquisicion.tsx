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
  toggleModal: () => void;
  cancelModal: () => void;
  open: boolean;
  arduinos: number;
  setPortSelected: React.Dispatch<React.SetStateAction<string>>;
  setBaudSelected: React.Dispatch<React.SetStateAction<number>>;
  setPortSelected2: React.Dispatch<React.SetStateAction<string>>;
  setBaudSelected2: React.Dispatch<React.SetStateAction<number>>;
}

export default function ModalSensoresAdquisicion(props: ModalProps) {
  const { toggleModal, cancelModal, open, arduinos, setPortSelected, setBaudSelected, setBaudSelected2, setPortSelected2 } = props;
  const [puerto, setPuerto] = React.useState('');
  const [baudRate, setBaudRate] = React.useState('9600');
  const [puerto2, setPuerto2] = React.useState('');
  const [baudRate2, setBaudRate2] = React.useState('9600');
  const [puertos, setPuertos] = React.useState([]);

  const handleChangePuerto = (event: SelectChangeEvent) => {
    setPuerto(event.target.value as string);
    setPortSelected(event.target.value as string);
  };

  const handleChangePuerto2 = (event: SelectChangeEvent) => {
    setPuerto2(event.target.value as string);
    setPortSelected2(event.target.value as string);
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
    const select: any = [];
    for (let i = 0; i < nombresSet.length; i += 1) {
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


  

  const multiplesPuertos = () => {
    const opciones : any = [];
    console.log("CALLED")
    console.log("PUERTOS", puertos)
    // className='multipleDisplay'
      opciones.push(
        <>
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
              <br />
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
                  } } />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Puertos</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={puerto2}
                  label="Puertos"
                  onChange={handleChangePuerto2}
                >
                  {puertos}
                </Select>
              </FormControl>
              <br />
                <TextField
                  autoFocus
                  margin="dense"
                  label="BaudRate"
                  type="text"
                  fullWidth
                  value={baudRate2}
                  onChange={(event) => {
                    const num = parseInt(event.target.value, 10);
                    setBaudRate2(event.target.value as string);
                    setBaudSelected2(num);
                  } } />
            </div>
          </>
      )
    return opciones;
  }

  // display: flex;
  //   justify-content: space-around;
  //   width: 100%;

  
  return (
    <div  
    className={
          arduinos > 1
            ? 'arduinosMultiples'
            : 'arduino'
        }
    >
      <Modal
        open={open}
        // onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // className={
        //   arduinos > 1
        //     ? 'arduinosMultiples'
        //     : 'arduino'
        // }
        // style={arduinos > 1
        //   ? {width: "600px"}
        //   : {width: "100%"}}
      >
        <Box sx={style}>
          {arduinos > 1 && 
            <><Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione los puertos a leer
            </Typography>
            <br />
            <div style={{ }}>
              {multiplesPuertos()}
            </div>
            <br /></>
          }
          {
            arduinos === 1 &&
            <><Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione el puerto a leer
            </Typography>
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
                } } />
              </div>
              <br /></>
          }
          
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
