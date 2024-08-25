import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import styleButton, {
  checkBoxConfig,
  styleButtonBiggerRed,
  styleAddIcon,
} from '../VerPaciente/ButtonStyle';
import './VerConfiguracionDetalle.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, FormControl, MenuItem, TextField } from '@mui/material';
import { CustomDisabledSelect, CustomDisabledTextField, MultimediaObj } from '../Utilities/Constants';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

export interface VerConfiguracionDetalleProps {
  onClickNav: () => void;
  resp: any;
  multimedia: Array<MultimediaObj>;
}

const VerConfiguracionDetalle = (props: VerConfiguracionDetalleProps) => {
  const { onClickNav, resp, multimedia } = props;
  const variable = "EMG's";
  const defaultTheme = createTheme();
  console.log("THIS IS", resp[0])
  return (
    <div>
      <section className="display-center">
        <h1>Configuration</h1>
      </section>
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
              <SettingsIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    fullWidth
                    value={resp[0].nombre}
                    label="Name"

                    disabled
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomDisabledTextField
                    disabled
                    fullWidth
                    label="Description"
                    value={resp[0].descripcion === null ? '...' : resp[0].descripcion}
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
                    <CustomDisabledSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="EMG"
                      value={resp[0].emgs}
                      disabled
                    >
                      <MenuItem value={resp[0].emgs}>{resp[0].emgs}</MenuItem>
                    </CustomDisabledSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" >
                  Additional sensors and capture keys allowed per sensor
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
                      {resp[0].temperatura === true ? (
                        <Checkbox
                          disabled
                          checked
                          sx={checkBoxConfig}
                          name="temperatura"
                          value="1"
                        />
                      ) : (
                        <Checkbox disabled sx={checkBoxConfig} name="temperatura" value="0" />
                      )}
                      {resp[0].frecuencia_cardiaca === true ? (
                        <Checkbox
                          checked
                          disabled
                          sx={checkBoxConfig}
                          name="frecuencia"
                          value="1"
                        />
                      ) : (
                        <Checkbox
                          disabled
                          sx={checkBoxConfig}
                          name="frecuencia"
                          value="0"
                        />
                      )}
                      {resp[0].gsr === true ? (
                        <Checkbox
                          checked
                          disabled
                          sx={checkBoxConfig}
                          name="gsr"
                          value="1"
                        />
                      ) : (
                        <Checkbox
                          disabled
                          sx={checkBoxConfig}
                          name="gsr"
                          value="0"
                        />
                      )}
                      {resp[0].acelerometro === true ? (
                        <Checkbox
                          checked
                          disabled
                          sx={checkBoxConfig}
                          name="acelerometro"
                          value="1"
                        />
                      ) : (
                        <Checkbox
                          disabled
                          sx={checkBoxConfig}
                          name="acelerometro"
                          value="0"
                        />
                      )}
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
                    value={resp[0].arduinos}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" >
                  Video:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography  variant="h6" >
                  {multimedia[0].link_video}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" >
                  Image:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography  variant="h6" >
                  {multimedia[0].link_imagen}
                  </Typography>
                </Grid>
              </Grid>
              <br/>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <section className="display-center">
        <Button
          sx={styleButtonBiggerRed}
          style={{ marginTop: '10px', fontSize: '20px' }}
          onClick={onClickNav}
        >
          Go Back
        </Button>
      </section>
      <br />
    </div>
  );
};

export default VerConfiguracionDetalle;
