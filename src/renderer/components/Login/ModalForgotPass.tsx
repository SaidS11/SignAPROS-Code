import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { styleButtonBigger } from '../VerPaciente/ButtonStyle';
import { useState } from 'react';
import { useCustomDispatch } from 'redux/hooks';
import { setFallosAlCargar, setErrorDetails ,setIsUploaded} from 'redux/slices/StatusSlice';
import { escape } from 'querystring';
import { apiEndpoint } from '../Utilities/Constants';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'black',
};
export interface ModalProps {
  toggleModal: () => void;
  open: boolean;
}
export default function ModalForgotPass(props: ModalProps) {
  const { toggleModal, open } = props;
  const [correo, setCorreo] = useState('');
  const [pagina, setPagina] = useState(0);
  const [codigo, setCodigo] = useState('')
  const [codigoApi, setCodigoApi] = useState('')
  const [contrasena, setContrasena] = useState('')
  const appDispatch = useCustomDispatch();
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */

  const actualizarContrasena = async() =>{
    const passEmail = {
      password: contrasena,
      email: correo
    }
    const updateDoctor = await fetch(
      `${apiEndpoint}/actualizarContrasena`,
      {
        method: 'PUT',
        body: JSON.stringify(passEmail),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (updateDoctor.status == 200){
      setPagina(3);
    }else{
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Problem while updating password'));
    }
  }

  const checkCode = async() => {
    console.log(codigoApi)
    console.log(codigo)

    console.log(typeof codigoApi)
    console.log(typeof codigo)
    if (codigo === codigoApi){
      setPagina(2)
    }else{
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Invalid code'));
    }
  }

  const sendMail = async() => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const esCorreo = emailRegex.test(correo);

    if (esCorreo) {
      console.log('Chido');
      const resultsCorreo = await fetch(`${apiEndpoint}/selectCorreo?correo=${correo}`);
      if (resultsCorreo.status === 200){
        setPagina(1);
        // setCorreo('');
        const resultCodigo = await fetch(`${apiEndpoint}/mandarCodigo?correo=${correo}`);
        const respBody = await resultCodigo.json();
        if (respBody != 0){
          console.log(respBody)
          setCodigoApi(respBody.toString())
          //setCodigo(respBody)
        }else{
          appDispatch(setFallosAlCargar(true));
          appDispatch(setErrorDetails('Problem while sending email'));
        }


      }else{
        appDispatch(setFallosAlCargar(true));
        appDispatch(setErrorDetails("There isn't any email associated"));
      }


    } else {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Invalid email format'));
    }
    console.log(correo);
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
          {' '}
          {pagina == 0 && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Escriba su correo
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Correo"
                type="text"
                fullWidth
                value={correo}
                onChange={(event) => {
                  setCorreo(event.target.value as string);
                }}
              />
              <Button sx={styleButtonBigger} onClick={sendMail}>
              Confirm
              </Button>
            </>
          )}
          {pagina == 1 && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                El código se ha mandado! Revise si correo y digitelo
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Código"
                type="text"
                fullWidth
                value={codigo}
                onChange={(event) => {
                  setCodigo(event.target.value as string);
                }}
              />
              <Button sx={styleButtonBigger} onClick={checkCode}>
              Confirm
              </Button>
            </>
          )}
          {pagina == 2 && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Escriba su nueva contraseña
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Contraseña"
                type="text"
                fullWidth
                value={contrasena}
                onChange={(event) => {
                  setContrasena(event.target.value as string);
                }}
              />
              <Button sx={styleButtonBigger} onClick={actualizarContrasena}>
              Confirm
              </Button>
            </>
          )}
          {pagina == 3 && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h1">
                !Cambio de contraseña realizado!
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
