/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './Prediccion.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { styleAddIcon, styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import EnhancedTable from '../ComenzarAnalisisEntrenamiento/EnhancedTable';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';


interface PrediccionProps {
  options: TableOptions<{ col1: string, col2: string }>;
  tableData: any;
  columnsData: any;
  data: any;
  dataM: any;
  onClickNav: any
  onClickStop: any
  protocolo: string; 
  setProtocolo: any;
}

const Prediccion = (
  props: PrediccionProps
) => {
  const { options, tableData, columnsData, data, dataM, onClickNav, onClickStop, protocolo, setProtocolo } = props;

  const setProtocols = () => {
    const plots = [];
    if (data.length > 0) {
      for(let i = 0; i < data.length; i+=1) {
        console.log('datos recibidos', data[i]);
        plots.push(
          <MenuItem key={i} value={`${data[i].nombre}`}>{data[i].nombre}</MenuItem>
        )
      }
      return plots;
    }
    return <option key={1} value={1} />;
  }
  
  const handleChangeProtocol = (event: SelectChangeEvent) => {
    setProtocolo(event.target.value as string);
  };

  const numOfAlgos = () => {
    const models = [];
    if (dataM.length >= 1) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < dataM.length; i++) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <option  key={i} value={`${dataM[i].nombre}`}>{dataM[i].nombre}</option>
        )
      }
      return models;
    }
    return <option value={1}>1</option>;
  }
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

  const defaultTheme = createTheme();


  return (
    <div>
      <div className="display-center">
        <h1>Prediction</h1>
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
              <BatchPredictionIcon sx={styleAddIcon} style={{color: "white"}}/>
            </Avatar>
            <Typography component="h1" variant="h5" >
            Select the experiment you want to use for prediction.
            </Typography>
            <Box component="form" onSubmit={onClickNav} sx={{ mt: 3 }}>
              <Grid container spacing={2}>                
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  Acquisition Experiment:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Experiment</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="protocolo"
                    value={protocolo}
                    label="Experiment"
                    onChange={handleChangeProtocol}
                    required
                  >
                    {setProtocols()}
                  </Select>
                </FormControl>
                </Grid>
                <br/>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <EnhancedTable
                    columns={columnsData}
                    data={tableData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                    Retrieved records:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h6" >
                  
                    {tableData.length}
                  </Typography>
                </Grid>
              </Grid>
              <br/>
              <section className='display-center'>
              <Button sx={styleButtonBiggerGreen} style={{ marginTop: '10px', fontSize: '20px', width: "100px" }} variant="contained" component="label">Continue
                <input hidden type="submit" />
              </Button>
              </section>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br/>
    </div>
  );
};

export default Prediccion;
