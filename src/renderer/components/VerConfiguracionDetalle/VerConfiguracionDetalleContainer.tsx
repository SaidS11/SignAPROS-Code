import { useNavigate } from 'react-router-dom';
import { useCustomSelector } from '../../../redux/hooks';
import VerConfiguracionDetalle from './VerConfiguracionDetalle';

const VerConfiguracionDetalleContainer = () => {
  const navigate = useNavigate();
  const resp = useCustomSelector((state) => state.config.configDetalle);
  const multimedia = useCustomSelector(
    (state) => state.config.configMultimedia
  );

  const onClickNav = () => {
    navigate('/verConfiguracion');
  };

  return (
    <VerConfiguracionDetalle
      onClickNav={onClickNav}
      resp={resp}
      multimedia={multimedia}
    />
  );
};

export default VerConfiguracionDetalleContainer;
