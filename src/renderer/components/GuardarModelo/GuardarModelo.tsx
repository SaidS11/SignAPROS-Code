import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Column } from 'react-table';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Algoritmo } from '../Utilities/Constants';
import GeneralTable from '../ComenzarAnalisisEntrenamiento/AlgorithmTable';
import {
  styleAddIcon,
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import EnhancedTable from './EnhancedTable';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

interface AlgoCols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

interface GuardarModeloProps {
  dataAlgoritmo: any;
  algoritmo: string;
  setAlgoritmo: any;
  setAlgoritmoTipo: any;
  modelosEncontrados: boolean;
  data: Cols[];
  columns: Array<Column<Cols>>;
  selectedProtocol: string;
  setData: any;
  onClickContinue: () => void;
  onClickBack: () => void;
  algoritmoTipo: string;
  setNombre: any;
  // setFirstRender: Dispatch<SetStateAction<boolean>>;
}

const GuardarModelo = (props: GuardarModeloProps) => {
  const {
    dataAlgoritmo,
    algoritmo,
    setAlgoritmo,
    setAlgoritmoTipo,
    modelosEncontrados,
    data,
    columns,
    selectedProtocol,
    setData,
    onClickContinue,
    onClickBack,
    algoritmoTipo,
    setNombre,
  } = props;
  const [selected, setSelected] = useState({});


  const handleChange = (event: SelectChangeEvent) => {
    console.log("nom", event.target.value);
    console.log("Data ", dataAlgoritmo);
    setAlgoritmo(event.target.value as string);

    const selectedLocal = dataAlgoritmo.find(
      (objeto: Algoritmo) => objeto.nombre === event.target.value
    );
    setSelected(selectedLocal)
    console.log('Retrieved Selected', selectedLocal);
    setAlgoritmoTipo(selectedLocal.algoritmo_ia);


  };

  const handleChangeNombre = useCallback((event: { target: { value: string } }) => {
    console.log("nom2", event.target.value)

    setNombre(event.target.value as string);
  }, []);

  const numOfAlgos = useMemo (() => {
    const models = [];
    if (dataAlgoritmo.length >= 1) {
      for (let i = 0; i < dataAlgoritmo.length; i += 1) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <MenuItem key={i} value={`${dataAlgoritmo[i].nombre}`}>
            {dataAlgoritmo[i].nombre}
          </MenuItem>
        );
      }
      return models;
    }
    return (
      <option key={1} value={1}>
        1
      </option>
    );
  }, [dataAlgoritmo]);

  const retrieveAlgoData = useMemo(() => {
      // const selected = dataAlgoritmo.find(
      //   (objeto: Algoritmo) => objeto.nombre === algoritmo
      // );
      // console.log('Retrieved', selected);
      // const claves = Object.keys(selected);
      // console.log('claves', claves);
      // setAlgoritmoTipo(selected.algoritmo_ia);
      if (algoritmo != '') {
        console.log("Cambiando ", selected);
  
        const algoData: Algoritmo = selected as unknown as Algoritmo;
  
        const parametrosString = Object.entries(algoData.parametros)
          .map(([propiedad, valor]) => `${propiedad}: ${valor}`)
          .join(', ');
        const data: AlgoCols[] = [
          {
            col1: algoData.nombre,
            col2: algoData.algoritmo_ia,
            col3: algoData.descripcion,
            col4: parametrosString,
          },
        ];
  
        return <GeneralTable data={data} />;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // const tableWrapper = useMemo(() => {
  //   return (
  //     <EnhancedTable
  //       columns={columns}
  //       data={data}
  //       selectedProtocol={selectedProtocol}
  //       setData={setData}
  //       algoritmo={algoritmo}
  //     />
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  const defaultTheme = createTheme();

  return (
    <div>
      <section className="display-center">
        <h2>Choose an algorithm and a model. </h2>
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
              <DeveloperBoardIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
              If there are previously created models you can select one, or you can create one.
            </Typography>
            <Typography component="h1" variant="h5" >
            In the end you can restart the process with a different model if you want to.
            </Typography>
            <Box sx={{ mt: 3 }} component="main" >
              <Grid container spacing={2}>
                
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Choose an algorithm:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="algoritmo"
                      value={algoritmo}
                      label="Algorithm"
                      onChange={handleChange}
                      required
                    >
                      {numOfAlgos}
                    </Select>
                  </FormControl>
                </Grid>
                {algoritmo !== '' && (
                  <><Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                      Info about the algorithm:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      {retrieveAlgoData}
                  </Grid></>
                )}
                {modelosEncontrados === false && algoritmo !== '' && (
                  <>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                    There aren't any models associated to this algorithm
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                    Choose .
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      onChange={handleChangeNombre}
                    />
                  </Grid>
                  </>
              )}
              {modelosEncontrados === true && algoritmo !== '' && (
                <>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                  Models associated with the algorithm.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                  You can select only one model.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <EnhancedTable
                    columns={columns}
                    data={data}
                    selectedProtocol={selectedProtocol}
                    setData={setData}
                    algoritmo={algoritmo}
                    algoritmoTipo={algoritmoTipo}
                  />
                </Grid>
                </>
                
              )}               
              </Grid>
              <br/>
              <div className="display-center">
                <section className="display-center">
                  <Button
                    sx={styleButtonBiggerGreen}
                    style={{ marginTop: '10px', fontSize: '20px' }}
                    onClick={onClickContinue}
                    // type="submit"
                  >
                    Continue
                  </Button>
                  <Button
                    sx={styleButtonBiggerRed}
                    style={{ marginTop: '10px', fontSize: '20px' }}
                    onClick={onClickBack}
                    
                  >
                    Go Back
                  </Button>
                </section>
                <br />
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      
      <br />
    </div>
  );
};

export default GuardarModelo;
