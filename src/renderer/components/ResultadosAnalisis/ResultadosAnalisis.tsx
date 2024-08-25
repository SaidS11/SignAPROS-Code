/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
  styleButtonBigger,
} from '../VerPaciente/ButtonStyle';
import './ResultadosAnalisis.css';

export interface ResultadosAnalisisProps {
  precision: string;
  f1: string;
  recall: string;
  analisis: any;
  tipo: string;
  toggleModal: any;
  onClickBack: () => void;
}

const ResultadosAnalisis = (props: ResultadosAnalisisProps) => {
  const { precision, f1, recall, analisis, tipo, toggleModal, onClickBack } =
    props;
  // const navigate = useNavigate();

  return (
    <div>
      <section className="display-center">
        <h1>Resultados</h1>
      </section>
      <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <section className="display-center">
        {tipo === 'Tree' && (
          <img src={require('../../../pythonScripts/Tree.png')} width="50%" />
        )}
        <img
          src={require('../../../pythonScripts/Confusion.png')}
          width="50%"
        />
      </section>
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>
      <div className="div-closingResultadosA">
        <section className="display-flexResultadosA">
          <h5>Resultado:</h5>
          <h5>En Riesgo</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Experiment:</h5>
          <h5>{analisis.protocolo}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Modelo Usado:</h5>
          <h5>{analisis.nombre}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Precisión:</h5>
          <h5>{precision}%</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>F1:</h5>
          <h5>{f1}%</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Recall:</h5>
          <h5>{recall}%</h5>
        </section>
        <section className="display-center">
          <Button sx={styleButtonBigger} onClick={() => toggleModal('body')}>
            Ver Más
          </Button>
        </section>
      </div>
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen}>Save Data</Button>
        <Button sx={styleButtonBigger}>Generate Report</Button>
        <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
        Cancel
        </Button>
      </section>
      <br />
    </div>
  );
};

export default ResultadosAnalisis;
