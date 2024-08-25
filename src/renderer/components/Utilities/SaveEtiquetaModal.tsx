import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  setIsLoading,
  setFailUpload,
  setIsUploaded,
} from 'redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setMongoInsertObject } from '../../../redux/slices/SeñalesSlice';
import { MongoInsertObjectInterface } from './Constants';
import {
  styleButtonBigger,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';

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
  toggleModalGuardar: () => void;
  open: boolean;
  objMongo: MongoInsertObjectInterface;
}

export default function SaveEtiquetaModal(props: ModalProps) {
  const { toggleModalGuardar, open, objMongo } = props;
  const appDispatch = useCustomDispatch();
  const datosPaciente = useCustomSelector((state) => state.datos.datosPaciente);
  const protocolo = useCustomSelector((state) => state.config.protocoloNombre);

  const navigate = useNavigate();

  const navigateToModels = () => {
    const objCopy = { ...objMongo };
    const etiquetaLocal = '';
    objCopy.etiqueta = etiquetaLocal;
    const nombreCompleto = `${datosPaciente[0].col1} ${datosPaciente[0].col2} ${datosPaciente[0].col3}`;
    objCopy.name = nombreCompleto;
    objCopy.protocol = protocolo;
    appDispatch(setMongoInsertObject(objCopy));
    const jsonDocument = JSON.stringify(objCopy);
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.insertarElementoMongo(jsonDocument);
  };

  window.electron.ipcRenderer.insertarElementoM((event: any, resp: any) => {
    if (resp[0] === 0) {
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
    } else {
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
      navigate('/verPaciente');
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModalGuardar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} noValidate autoComplete="off" component="form">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to continue without assign a label?
          </Typography>
          <Button sx={styleButtonBiggerRed} onClick={toggleModalGuardar}>
          Cancel
          </Button>
          <Button sx={styleButtonBigger} onClick={navigateToModels}>
          Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
