/* eslint-disable prettier/prettier */
import { styleButtonMenuInicial } from '../VerPaciente/ButtonStyle';
import './VerInicio.css';
import Button from '@mui/material/Button';

interface InicioProps {
  onClickPacientes: () => void;
  onClickProtocolo: () => void;
  onClickAnalisis: () => void;
  handleRedirect: (e: any) => void;
}

export const Inicio = (props: InicioProps) => {
    const { onClickPacientes, onClickProtocolo, onClickAnalisis, handleRedirect } = props;
    return (
      <div style={{marginTop: '3%'}}>
      <div className='display-center'>
        <h1 style={{fontWeight: '700'}}>Welcome to SignAPROS</h1>
      </div>

      <br />
      <div className='display-center'>
        <h3>This system allows you to create protocols</h3>
      </div>
      <div className='display-center'>
        <h3>keep subject records</h3>
      </div>
      <div className='display-center'>
        <h3>and make analysis and classification using AI.</h3>
      </div>
      <br />
      <div className='display-center'>
        <h2 style={{fontWeight: '600'}}>Click to get more info: </h2>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={onClickPacientes} sx={styleButtonMenuInicial}>Subjects</Button>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={onClickProtocolo} sx={styleButtonMenuInicial}>Experiment</Button>
      </div>
      <br />
      <div className='display-center'>
        <Button onClick={handleRedirect} sx={styleButtonMenuInicial}>Prediction</Button>
      </div>
      <div className='display-center'>
        <h5 style={{marginTop: '3%'}}>Universidad de Guadalajara 2023</h5>
      </div>
      </div>
    );
};

export default Inicio;