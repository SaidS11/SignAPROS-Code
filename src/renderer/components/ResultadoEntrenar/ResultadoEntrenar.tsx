/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  styleButtonBiggerRed,
  styleButtonBiggerGreen,
  styleButtonBigger,
  styleAddIcon,
} from '../VerPaciente/ButtonStyle';
import ResultsTableContainer from '../Utilities/ResultsTableContainer';
import './ResultadoEntrenar.css';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TaskIcon from '@mui/icons-material/Task';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useCustomSelector } from 'redux/hooks';



export interface ResultadoEntrenarProps {
  onClickSave: () => void;
  onClickProbar: () => void;
  onClickDetener: () => void;
  probando: boolean;
  onClickBack: () => void;
  onClickPredict: () => void;
  precision: string;
  f1: string;
  recall: string;
  crossParsed: string;
  analisis: any;
  tipo: string;
  respAnalisis: string;
  toggleModalVerMas: any;
  onClickCambiar: () => void;
  predictMode: boolean;
  eliminar: () => void;
}

const ResultadoEntrenar = (props: ResultadoEntrenarProps) => {
  const {
    onClickSave,
    onClickProbar,
    onClickDetener,
    probando,
    onClickBack,
    onClickPredict,
    precision,
    f1,
    recall,
    crossParsed,
    analisis,
    tipo,
    respAnalisis,
    toggleModalVerMas,
    onClickCambiar,
    predictMode,
    eliminar,
  } = props;
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const implementacionUsada = useCustomSelector(
    (state) => state.config.selectedModels
  );

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg">

          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <TaskIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Analyse or save the results
            </Typography>
            <Typography component="h1" variant="h4" >
            Clasification process
            </Typography>
            <Typography component="h1" variant="h5" >
            Table with results per subject
            </Typography>
            <Box component="div" sx={{ overflow: 'hidden' }}>
              <ResultsTableContainer stringObjData={respAnalisis} />
            </Box>

          </Box>
        </Container>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" >
                  Metrics:
                  </Typography>
                  </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" sx={{fontWeight: "bold"}}>
                  Experiment:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {analisis.protocolo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" sx={{fontWeight: "bold"}}>
                  Implementation Used:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {implementacionUsada[0].col1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {analisis.algoritmo}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  {/* <Typography component="h1" variant="h6" >
                  {crossParsed}
                  </Typography> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" sx={{fontWeight: "bold"}}>
                  Precision:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {precision}%
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" sx={{fontWeight: "bold"}} >
                  F1:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {f1}%
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" sx={{fontWeight: "bold"}}>
                  Recall:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  {recall}%
                  </Typography>
                </Grid>
              </Grid>
              <br/>
              <section className="display-center">
                <Button
                  sx={styleButtonBigger}
                  onClick={() => toggleModalVerMas('body')}
                >
                  See More
                </Button>
              </section>
              {!predictMode && (
                <section className="display-center">
                  <Button sx={styleButtonBiggerGreen} onClick={onClickSave}>
                    Save Model
                  </Button>
                  <Button sx={styleButtonBigger} onClick={onClickCambiar}>
                    Change Algorithm
                  </Button>
                  <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
                  Cancel
                  </Button>
                </section>
              )}{' '}
              {predictMode && (
                <section className="display-center">
                  <Button sx={styleButtonBiggerRed} onClick={onClickPredict}>Cancel</Button>
                </section>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <section className="display-center">
        <h3>Analice o guarde los resultados</h3>
      </section>
      <section className="display-center">
        <h3 style={{ fontWeight: 'bold' }}>Proceso de Clasificación</h3>
      </section>
      <section className="display-center">
        <h3>Tabla con resultados por sujeto</h3>
      </section>
      <section className="display-center">
        <ResultsTableContainer stringObjData={respAnalisis} />
      </section>
      <section className="display-center">
        <h1>Métricas:</h1>
      </section>
      <div className="div-closingResultadosEntr">
        <section className="display-flexResultadosA">
          <h5>Protocolo: </h5>
          <h5>{analisis.protocolo}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Implementación Usada:</h5>
          <h5>{analisis.algoritmo}</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>Nombre del modelo generado:</h5>
          <h5>NA</h5>
        </section>
        <section className="display-flexResultadosA">
          <h5>{crossParsed}</h5>
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
          <Button
            sx={styleButtonBigger}
            onClick={() => toggleModalVerMas('body')}
          >
            Ver Más
          </Button>
        </section>
      </div>
      {!predictMode && (
        <section className="display-center">
          <Button sx={styleButtonBiggerGreen} onClick={onClickSave}>
            Guardar Modelo
          </Button>
          <Button sx={styleButtonBigger} onClick={onClickCambiar}>
            Cambiar Algoritmo
          </Button>
          <Button sx={styleButtonBiggerRed} onClick={onClickBack}>
            Cancelar
          </Button>
        </section>
      )}{' '}
      {predictMode && (
        <section className="display-center">
          <Button sx={styleButtonBiggerRed}>Cancelar</Button>
        </section>
      )} */}
      <br />
    </div>
  );
};

export default ResultadoEntrenar;
