import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import TextField from '@mui/material/TextField';
import {
  styleAddIcon,
} from '../VerPaciente/ButtonStyle';
import './AgregarDoctor.css';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface AgregarDoctorProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
  onClickBack: () => void;

}

const AgregarDoctor = (props: AgregarDoctorProps) => {
  const { onClickNav,onClickBack  } = props;
  // const navigate = useNavigate();

  const defaultTheme = createTheme();

  const inlineHover = {
    '&:hover': {
      backgroundColor: "white",
      color: "blue"
    }
  }

  

  return (
    <div >
      <section className="display-center">
        <h1>Add Doctor</h1>
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
            <PersonAddIcon sx={styleAddIcon} style={{color: "white"}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
          Fill the data
          </Typography>
          <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="nombreDoctor"
                  name="nombreDoctor"
                  label="Names"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Paternal Surname"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Maternal Surname"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  id="password"
                  name="password"
                  autoComplete="family-name"
                />
              </Grid>
              {/*<Grid item xs={12}>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Seleccione el Sexo:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="sexo"
                      value={sexo}
                      label="Sexo"
                      onChange={handleChange}
                      fullWidth
                      required
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Femenino">Femenino</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>*/}
              {/* <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={"MM/DD/YYYY"} disableFuture orientation="landscape"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    slotProps={{
                      textField: {
                        helperText: 'Fecha de Nacimiento',
                      },
                    }}
                    />
                </LocalizationProvider>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Email:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Phone Number:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="telefono"
                  label="Cell phone"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="telefono"
                />
              </Grid>
              {/*<Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Peso en kg:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Peso"
                  id="peso"
                  name="peso"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
            </Grid>*/}
              {/*<Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Estatura en cm:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Estatura"
                  id="estatura"
                  name="estatura"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
          </Grid>*/}
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Birthdate:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  min="1900-01-01"
                  max="2022-12-31"
                  required
                />

              </Grid>
            </Grid>
            <br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                border: '1px solid #ccc',
                "&:hover": {
                backgroundColor: "white",
                color: "#1565c0",
                transform: "scale(1.05)",
                borderColor: "#1565c0"
              } }}
              // sx={styleButtonBiggerGreen}
            >
              Confirm
            </Button>
            <Button
              onClick={onClickBack}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                border: '1px solid #ccc',
                backgroundColor: 'red',

                "&:hover": {
                backgroundColor: "white",
                color: "red",
                transform: "scale(1.05)",
                borderColor: "red"
              } }}
              // sx={styleButtonBiggerGreen}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      <br />
    </div>
  );
};

export default AgregarDoctor;
