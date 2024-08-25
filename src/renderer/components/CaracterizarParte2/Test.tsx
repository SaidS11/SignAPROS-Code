import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector } from '../../../redux/hooks';
import styleButton, {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';

const Test = () => {
  const navigate = useNavigate();
  const datos = useCustomSelector((state) => state.señales.datosAnalisisIA);
  console.log('Estos son los datos', datos);
  const strData = JSON.stringify(datos);
  console.log('Estos son los datos str', strData);
  const onClickNav = () => {
    navigate('/preAnalisis');
  };
  return (
    <div>
      Hola
      <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
      Continue
      </Button>
    </div>
  );
};

export default Test;
