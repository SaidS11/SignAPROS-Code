/* eslint-disable global-require */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';


export interface PreAnalisisProps {
  onClickNav: () => void;
}

const PreAnalisis = (props: PreAnalisisProps) => {
  const { onClickNav } = props;
  return (
    <div>
      <section className="display-center">
        <h1>Informacion Acerca de los Datos</h1>
      </section>
      <section className='display-center'>
        <img src={require('../../../pythonScripts/Boxplot.png')} width="40%" alt="BoxPlot" />
        <img src={require('../../../pythonScripts/Correlation.png')} width="40%" alt="Correlation" />
      </section>
      <section className='display-center'>
        <img src={require('../../../pythonScripts/Histogram.png')} width="40%" alt="Histrogram" />
        <img src={require('../../../pythonScripts/Violin.png')} width="40%" alt="Violin" />
      </section>
      <br />
      <section className='display-center'>
        <Button sx={styleButtonBiggerGreen} style={{ marginTop: '10px', fontSize: '20px' }} onClick={onClickNav}>
        Continue
        </Button>
      </section>
      <br />
    </div>
  );
};

export default PreAnalisis;
