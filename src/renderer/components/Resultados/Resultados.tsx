/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import React from 'react';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import './Resultados.css';
import GraficaDeSensores from './GraficaDeSensores';
import SensoresAdquisicionGraficarContainer from '../SensoresAdquisicion/SensoresAdquisicionGraficarContainer';
import SensoresAdquisicionGraficar from '../SensoresAdquisicion/SensoresAdquisicionGraficar';

export interface ResultadosProps {
  onClickBack: () => void;
  dataArr: any;
  gridLayout: any;
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
  emgDataAdquirida: any;
  arduinoDataAdquirida: any;
  sensoresSelected: any;
}

const Resultados = (props: ResultadosProps) => {
  const { onClickBack, dataArr, gridLayout, onClickCrear, emgDataAdquirida, arduinoDataAdquirida, sensoresSelected} = props;
  // const navigate = useNavigate();
  return (
    <div>
      <section className="display-center">
        <h1>Results</h1>
      </section>
      <section className="display-center">
        <h3>Analyse or save the results</h3>
      </section>
      {/* <GraficaDeSensores dataArr={dataArr} gridLayout={gridLayout} /> */}
      <SensoresAdquisicionGraficar gridLayout={gridLayout} dataArr={dataArr}/>;
      {/* <SensoresAdquisicionGraficarContainer cantidadEmgs={sensoresSelected} emgData={emgDataAdquirida} arduinoData={arduinoDataAdquirida} /> */}
      <form onSubmit={onClickCrear}>
        <section className="display-flex">
          <h5>Label assigned to the record (leave empty is subjects data will be used to predict): </h5>
          <input type="text" name="etiqueta" style={{ marginLeft: '10px' }} />
        </section>
        <br />
        {/* <section>
          <ProbarSensores sensoresSelected={sensores} />
        </section> */}

        <section className="display-center">
          <Button
            sx={styleButtonBiggerGreen}
            style={{ marginTop: '10px', fontSize: '20px' }}
            variant="contained"
            component="label"
          >
            Save Record <input hidden type="submit" />
          </Button>
          <Button
            sx={styleButtonBiggerRed}
            style={{ marginTop: '10px', fontSize: '20px' }}
            onClick={onClickBack}
          >
            Cancel
          </Button>
        </section>
      </form>
      <br />
    </div>
  );
};

export default Resultados;
