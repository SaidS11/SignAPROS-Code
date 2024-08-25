/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { InputLabel, FormControl, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';
import {
  styleButtonBiggerGreen, checkBoxConfig, styleAddIcon,
} from '../VerPaciente/ButtonStyle';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';


export interface CrearConfigProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
  canales: string;
  setCanales: Dispatch<SetStateAction<string>>
}

const CrearConfiguracion = (props: CrearConfigProps) => {
  const { onClickNav, canales, setCanales } = props;
  const variable = "EMG's"
  
  const handleChangeCanales = (event: SelectChangeEvent) => {
    setCanales(event.target.value as string);
  };

  const numofEmgs = () => {
    const emgs = [];
    for(let i=1; i<=4; i++) {
      emgs.push(
        // <option value={`${i}`} key={i}>{`${i}`}</option>
        <MenuItem key={i} value={i}>{`${i}`}</MenuItem>

      )
    }
    return emgs;
  }

  const defaultTheme = createTheme();


    return (
        <div>
          <section className="display-center">
            <h1>Create Configuration</h1>
          </section>
          <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <SettingsIcon sx={styleAddIcon} style={{color: "white"}}/>
                  </Avatar>
                  <Typography component="h1" variant="h5" >
                  Fill the configuration data
                  </Typography>
                  <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="nombreConfig"
                          name="nombreConfig"
                          label="Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          type="descripcion"
                          id="descripcion"
                          label="Description"
                          name="descripcion"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="h1" variant="h6" >
                        Number of channels
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">EMG</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="canales"
                            label="EMG"
                            value={canales}
                            onChange={handleChangeCanales}
                            required
                          >
                            {numofEmgs()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        Additional Sensors and capture keys allowed per sensor
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <div className='display-margin'>
                          <div >
                            <h4>Temperature:</h4>
                            <h4>Heart Rate:</h4>
                            <h4>Gsr:</h4>
                            <h4>Accelerometer:</h4>
                          </div>
                          <div>
                            <Checkbox sx={checkBoxConfig} name="temperatura" value="1"  />
                            <Checkbox sx={checkBoxConfig} name="frecuencia" value="1"  />
                            <Checkbox sx={checkBoxConfig} name="gsr" value="1"  />
                            <Checkbox sx={checkBoxConfig} name="acelerometro" value="1"  />
                          </div>
                          <div>
                            <h4>TC</h4>
                            <h4>HRLM</h4>
                            <h4>GSR</h4>
                            <h4>INCLX, INCLY, INCLY</h4>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        Number of arduinos necessary for acquisition
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          type="number"
                          id="arduinos"
                          name="arduinos"
                          min="0"
                          max="2"
                          required
                        />
                      </Grid>

                    </Grid>
                    <br/>
                    <section className='display-center'>
                      <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
                  component="label">Continue <input hidden type="submit" /></Button>
                    </section>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          <br />
        </div>
      );
};

export default CrearConfiguracion;
