import { useCustomSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

import VerImplementacionDetalle from './VerImplementacionDetalle';

const VerImplementacionDetalleContainer = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/verImplementaciones');
  };
  const resp = useCustomSelector((state) => state.config.modeloDetalle);
  return <VerImplementacionDetalle resp={resp} onClickBack={onClickBack}/>;
};

export default VerImplementacionDetalleContainer;
