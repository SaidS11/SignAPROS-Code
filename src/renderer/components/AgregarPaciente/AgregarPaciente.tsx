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
import './AgregarPaciente.css';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface AgregarPacienteProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;

}

const AgregarPaciente = (props: AgregarPacienteProps) => {
  const { onClickNav } = props;
  // const navigate = useNavigate();
  const [sexo, setSexo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const num = parseInt(event.target.value, 10);
    setSexo(event.target.value as string);
  };

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
        <h1>Add subject</h1>
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
          Fill subject data
          </Typography>
          <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="nombrePaciente"
                  name="nombrePaciente"
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
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Select Gender:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="sexo"
                      value={sexo}
                      label="Gender"
                      onChange={handleChange}
                      fullWidth
                      // required
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Femenino">Femenino</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
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
                  Cell phone:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // required
                  fullWidth
                  name="telefono"
                  label="Cell phone"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="telefono"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Weight(kg):
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // required
                  fullWidth
                  label="Weight"
                  id="peso"
                  name="peso"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Height(cm):
                  </Typography>
              </Grid> 
              <Grid item xs={12} sm={6}>
                <TextField
                  // required
                  fullWidth
                  label="Height"
                  id="estatura"
                  name="estatura"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Birthdate:
                  </Typography>
              </Grid> 
              <Grid item xs={12} sm={6}>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  min="1900-01-01"
                  max="2022-12-31"
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      {/* <div className="display-center" >
        <form className="analisis-form" style={{  backgroundColor: "white" }} onSubmit={onClickNav}>
        <section className="display-flexAgregar">
          <TextField label="Nombre" variant="standard" 
          id="nombrePaciente2"
          name="nombrePaciente2"
          fullWidth 
          required
          />
        </section>
          <section className="display-flexAgregar">
            <h4>Nombre:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              id="nombrePaciente"
              name="nombrePaciente"
              required
            />
          </section>
          
          <section className="display-flexAgregar">
            <h4>Apellido Paterno:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              name="apellidoPaterno"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Apellido Materno:</h4>
            <input
              className="first-inputAgregar"
              type="text"
              name="apellidoMaterno"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Sexo:</h4>
            <section className="list-box-sexo">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="sexo"
                  value={sexo}
                  label="Sexo"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                </Select>
              </FormControl>
            </section>
          </section>
          <section className="display-flexAgregar">
            <h4>Telefono:</h4>
            <input
              className="first-inputAgregar"
              type="tel"
              name="telefono"
              pattern="[0-9]{10}"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Fecha de Nacimiento:</h4>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              min="1900-01-01"
              max="2022-12-31"
              required
            />
          </section>
          <section className="display-flexAgregar">
            <h4>Correo:</h4>
            <input type="email" id="email" name="email" size={47} required />
          </section>
          <section className="display-flexAgregar">
            <h4>Peso: (kg)</h4>
            <input
              required
              type="number"
              id="peso"
              name="peso"
              min="10"
              max="500"
            />
            <h4>Estatura: (cm)</h4>
            <input
              type="number"
              id="estatura"
              name="estatura"
              min="10"
              max="300"
              required
            />
          </section>
          <br />
          <section className="display-center">
            <Button
              sx={styleButtonBiggerGreen}
              variant="contained"
              component="label"
            >
              Confirmar
              <input hidden type="submit" />
            </Button>
            <Button sx={styleButtonBiggerRed}>Regresar</Button>
          </section>
        </form>
      </div> */}
      <br />
    </div>
  );
};

export default AgregarPaciente;
