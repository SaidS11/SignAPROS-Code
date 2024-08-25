import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ProcesamientoPrevioBlank = () => {
  const navigate = useNavigate();

  const onClickCancel = () => {
    navigate('/videoDemo');
  };

  const onClickContinue = () => {
    navigate('/resultados');
  };
  return (
    <div>
      <Button onClick={onClickContinue}>Continue</Button>
      <Button onClick={onClickCancel}>Go Back</Button>
    </div>
  );
};

export default ProcesamientoPrevioBlank;
