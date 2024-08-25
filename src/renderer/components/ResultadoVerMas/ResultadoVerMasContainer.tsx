// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultadoVerMas from './ResultadoVerMas';

const ResultadoVerMasContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const onClickNav = () => {
    navigate('/video');
  };
  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };

  return (
    <div>
      <ResultadoVerMas onClickNav={onClickNav} onClickProbar={onClickProbar} />
    </div>
  );
};

export default ResultadoVerMasContainer;
