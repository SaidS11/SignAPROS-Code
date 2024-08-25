/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useMemo, useState } from 'react';
import { styleButtonBiggerRed, styleAddIcon } from '../VerPaciente/ButtonStyle';
import BuildIcon from '@mui/icons-material/Build';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomDisabledTextField, CustomDisabledSelect, apiEndpoint } from '../Utilities/Constants';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';


interface VerModeloProps {
  resp: any;
  onClickBack: () => void;
}


const neuronasComponente = (capas: number, neuronas: Array<string>) => {
  const listaDeInputs = [];
  for(let i = 0; i< capas; i+=1) {
    listaDeInputs.push(
      <>
      <Grid item xs={12} sm={6}>
        <Typography component="h1" variant="h6" key={i} >
          Capa N. {i + 1}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
          <CustomDisabledTextField
            disabled
            fullWidth
            id={`neurona ${i}`}
            value={`${neuronas[i]}`}
            name={`neurona ${i}`}
            type="number"
            inputProps={{ min: 1, max: 10 }}
            key={i}
            />
        </Grid>
    </>
    )
  }
  return listaDeInputs;
  
}

const VerImplementacionDetalle = (props: VerModeloProps) => {
  const { resp, onClickBack } = props;
  const [tipo, setTipo] = useState(resp.algoritmo_ia);
  console.log("THIS IS", resp);
  const defaultTheme = createTheme();

  const params = JSON.stringify(resp.parametros);
  console.log("Converted", params);

  

  return (
    <div>
      <div className="display-center">
        <h1>Algorithm Implementation</h1>
      </div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <BuildIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Data
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Name"
                    value={resp.nombre}
                    autoFocus
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Description"
                    value={resp.descripcion}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Selected Algorithm:
                    </Typography>
                </Grid>
                <Grid item xs={12}  sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                    Algorithm
                    </InputLabel>
                    <CustomDisabledSelect labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="algoritmo"
                        value={tipo}
                        label="Algorithm"
                        required
                        disabled
                        >
                      <MenuItem value={tipo}>{tipo}</MenuItem>
                    </CustomDisabledSelect>
                  </FormControl>
                </Grid>
                {tipo === "Arbol de Decisión" &&
                <>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6">
                    Selected Depth:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDisabledTextField
                    fullWidth
                    label="Depth"
                    value={resp.parametros.profundidad}
                    disabled                      
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6">
                    Selected Random State:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomDisabledTextField
                    disabled                      
                    fullWidth
                    label="State"
                    value={resp.parametros.estado}
                    />
                  </Grid></>
                }
                {tipo === "K-Nearest Neighbor" &&
                <><Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Selected Neighbors:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      id="vecinos"
                      label="Vecinos"
                      disabled
                      value={resp.parametros.vecinos} />
                  </Grid></>
                }
                {tipo === "Maquina de Soporte Vectorial" &&
                <><Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Selected Kernel:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Kernel
                        </InputLabel>
                        <CustomDisabledSelect labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="kernel"
                          value={resp.parametros.kernel}
                          label="kernel"
                          disabled
                        >
                          <MenuItem value={resp.parametros.kernel}>{resp.parametros.kernel}</MenuItem>
                        </CustomDisabledSelect>
                      </FormControl>
                    </Grid></>
                }
                {tipo === "Red Neuronal" &&
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Layers
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <CustomDisabledTextField
                        disabled
                        fullWidth
                        id="capas"
                        value={resp.parametros.capas}
                        name="capas"
                        type="number"
                        />
                  </Grid>
                  {neuronasComponente(resp.parametros.capas, resp.parametros.neuronas)}
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6">
                      Activation function:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Function
                      </InputLabel>
                      <CustomDisabledSelect labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="funcion"
                        label="Function"
                        value={resp.parametros.funcion}
                        disabled
                      >
                        <MenuItem value="linear">{resp.parametros.funcion}</MenuItem>
                      </CustomDisabledSelect>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6">
                    Initial learning rate
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      disabled
                      fullWidth
                      id="tasa"
                      name="tasa"
                      value={resp.parametros.tasa}
                      type="number"
                      inputProps={{ min: 0.001, max: 1, step: 0.001 }}
                      />
                  </Grid>
                    
                    
                    </>
                }
              </Grid>
              <br/>
              <section className='display-center'>
                <Button sx={styleButtonBiggerRed} onClick={onClickBack}>Go Back</Button>
              </section>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default VerImplementacionDetalle;
