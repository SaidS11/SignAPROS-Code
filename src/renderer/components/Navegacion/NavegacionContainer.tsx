import { useNavigate } from 'react-router-dom';
import Navegacion from './Navegacion';

const LoginContainer = () => {
  const navigate = useNavigate();

  const onClickNav = (ruta: string) => {
    navigate(`/${ruta}`);
  };
  return <Navegacion onClickNav={onClickNav} />;
};

export default LoginContainer;
