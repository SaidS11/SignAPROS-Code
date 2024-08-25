/* eslint-disable prettier/prettier */
import { Dispatch, SetStateAction } from 'react';
import {
  styleAddIcon,
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';
import Button from '@mui/material/Button';
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


export interface CrearProtocoloProps {
  onClickCrear: (arg0: React.FormEvent<HTMLFormElement>) => void;
  data: any;
  configuration: string;
  setConfiguration: Dispatch<SetStateAction<string>>
}

const CrearProtocolo = (props: CrearProtocoloProps) => {
  const { onClickCrear, data, configuration, setConfiguration } = props;

  const handleChangeConfiguration = (event: SelectChangeEvent) => {
    setConfiguration(event.target.value as string);
  };
  const setConfig = () => {
    const plots = [];
    if (data.length > 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        console.log('datos recibidios', data[i]);
        plots.push(
          // <option value={`${data[i].nombre}`}>{data[i].nombre}</option>
          <MenuItem key={i} value={`${data[i].nombre}`}>{data[i].nombre}</MenuItem>

        );
      }
      return plots;
    }
    return <option value={0} />;
  };

  const defaultTheme = createTheme();

    return (
        <div>
            <section className="display-center">
              <h1>Create Experiment</h1>
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
                    <AddIcon sx={styleAddIcon} style={{color: "white"}}/>
                  </Avatar>
                  <Typography component="h1" variant="h5" >
                  Fill the protocol data
                  </Typography>
                  <Box component="form" onSubmit={onClickCrear} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="nombre"
                          name="nombre"
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
                        Select configuration:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Configuration</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="configuracion"
                              label="Configuration"
                              value={configuration}
                              onChange={handleChangeConfiguration}
                              required
                            >
                              {setConfig()}
                            </Select>
                          </FormControl>
                      </Grid>
                    </Grid>
                    <br/>
                    <section className='display-center'>
                      <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained"
                  component="label">Create <input hidden type="submit" /></Button>
                    </section>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
        </div>
      );
};

export default CrearProtocolo;
