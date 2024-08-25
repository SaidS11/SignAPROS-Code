/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
  styleButtonBigger,
} from '../VerPaciente/ButtonStyle';
import ProbarSensores from '../ProbarSensores/ProbarSensores';
import './ResultadoVerMas.css';

export interface ResultadoVerMasProps {
  onClickNav: () => void;
  onClickProbar: () => void;
}

const ResultadoVerMas = (props: ResultadoVerMasProps) => {
  const { onClickNav, onClickProbar } = props;
  // const navigate = useNavigate();

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      {/* <section>
        <ProbarSensores sensoresSelected={8} />
      </section> */}
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>
      <div className="div-closingResultadosVerMas">
        <section className="display-flexResultadosVerMas">
          <h5>Resultado:</h5>
          <h5>En Riesgo</h5>
        </section>
        <section className="display-flexResultadosVerMas">
          <h5>Experiment:</h5>
          <h5>Protocolo 1</h5>
        </section>
        <section className="display-flexResultadosVerMas">
          <h5>Modelo Usado:</h5>
          <h5>Modelo 1</h5>
        </section>
        <section className="display-flexResultadosVerMas">
          <h5>Precisión:</h5>
          <h5>99.9%</h5>
        </section>
        <section className="display-center">
          <Button sx={styleButtonBigger} onClick={onClickProbar}>
            Ver Más
          </Button>
        </section>
      </div>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={onClickNav}>
          Guardar Modelo
        </Button>
        <Button sx={styleButtonBiggerRed}>Go Back</Button>
      </section>
      <br />
    </div>
  );
};

export default ResultadoVerMas;
