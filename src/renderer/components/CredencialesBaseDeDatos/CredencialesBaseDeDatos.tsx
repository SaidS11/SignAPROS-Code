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
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface CredencialesBaseDeDatosProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
  onClickBack: () => void;

}

const CredencialesBaseDeDatos = (props: CredencialesBaseDeDatosProps) => {
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
        <h1>Configure your credentials</h1>
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
          Fill the data with your database credentials
          </Typography>
          <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  User:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="user"
                  label="postgres"
                  name="user"
                  autoComplete="postgres"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Host:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="host"
                  label="localhost"
                  id="host"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Database:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="database"
                  label="signapros"
                  id="database"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Password:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="admin"
                  id="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Port:
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="port"
                  label="5432"
                  id="port"
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

export default CredencialesBaseDeDatos;
