/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import React from 'react';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './VerSignal.css';
import GraficaDeSensores from './GraficaDeSensores';
import SensoresAdquisicionGraficarContainer from '../SensoresAdquisicion/SensoresAdquisicionGraficarContainer';
import SensoresAdquisicionGraficar from '../SensoresAdquisicion/SensoresAdquisicionGraficar';

export interface VerSignalProps {
  onClickBack: () => void;
  dataArr: any;
  gridLayout: any;
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
  emgDataAdquirida: any;
  arduinoDataAdquirida: any;
  sensoresSelected: any;
}

const VerSignal = (props: VerSignalProps) => {
  const { onClickBack, dataArr, gridLayout, onClickCrear, emgDataAdquirida, arduinoDataAdquirida, sensoresSelected} = props;
  // const navigate = useNavigate();
  return (
    <div>
      <section className="display-center">
        <h1>Signals</h1>
      </section>
      {/* <GraficaDeSensores dataArr={dataArr} gridLayout={gridLayout} /> */}
      <SensoresAdquisicionGraficar gridLayout={gridLayout} dataArr={dataArr}/>;
      {/* <SensoresAdquisicionGraficarContainer cantidadEmgs={sensoresSelected} emgData={emgDataAdquirida} arduinoData={arduinoDataAdquirida} /> */}
      <form onSubmit={onClickCrear}>

        <section className="display-center">
          <Button
            sx={styleButtonBiggerRed}
            style={{ marginTop: '10px', fontSize: '20px' }}
            onClick={onClickBack}
          >
            Go Back
          </Button>
        </section>
      </form>
      <br />
    </div>
  );
};

export default VerSignal;
