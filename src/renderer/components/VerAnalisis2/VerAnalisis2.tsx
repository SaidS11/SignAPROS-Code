/* eslint-disable prettier/prettier */
import './VerAnalisis2.css';
import Button from '@mui/material/Button';
import {
    styleButtonBiggerGreen,
  } from '../VerPaciente/ButtonStyle';

const VerAnalisis2 = () => {
    return (
        <div>
          <section className="display-center">
            <h1>Análisis Seleccionado</h1>
          </section>
          <div className='display-center'>
          <form className="analisis-form" action="">
            <section className="display-flex">
              <h4>Name:</h4>
              <input className="first-input" type="text" />
            </section>
            <section className="display-flex">
              <h4>Description:</h4>
              <textarea className="second-input" />
            </section>
            <section className="display-flex">
              <h4>Modelo:</h4>
              <input className="first-input" type="text" />
            </section>
            <br />
            <section className='display-center'>
            <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} >Generación de Modelos</Button> <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} >Prediction</Button>
          </section>
          <br />
          </form>
          </div>

        </div>
      );
};

export default VerAnalisis2;