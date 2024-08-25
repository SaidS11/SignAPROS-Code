/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import './VerPaciente.css';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
// import TableStylesList from "./TableStylesList";

import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styleButton, {styleAddIcon} from './ButtonStyle';
import Typography from '@mui/material/Typography';
import './VerPaciente.css';
import { CustomDisabledTextField } from '../Utilities/Constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}
interface VerPacienteProps {
  options: TableOptions<{ col1: string }>;
  datosArray: Cols[];
  onClickCaptura: () => void;
  onClickIrInicio: () => void;
  onClickRow: (arg0: any) => void;
  onClickVer:(arg0: any) => void;
}

const VerPaciente = (props: VerPacienteProps) => {
  const { options, datosArray, onClickCaptura, onClickIrInicio, onClickRow, onClickVer } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

  const disabledStyle = (theme: any) => ({
    backgroundColor: "dimgrey",
    "& .MuiInputBase-input.Mui-disabled": {
      color: "white",
    },
    "& input.Mui-disabled": {
      color: "green"
    },
    input: {
      "& input.Mui-disabled": {
        color: "green"
      }
    }
    // opacity: "1",
  })


  

  const defaultTheme = createTheme();
  console.log("THIS IS DATA", datosArray);

  const nombreCensurado = datosArray[0].col1.length > 0 ? '*'.repeat(datosArray[0].col1.length) : '******';
  const apellidoPCensurado = datosArray[0].col2.length > 0 ? '*'.repeat(datosArray[0].col3.length) : '******';
  const apellidoMCensurado = datosArray[0].col3.length > 0 ? '*'.repeat(datosArray[0].col4.length) : '******';


  return (
    <div>
      <div style={{}}>
        <section className="display-center">
          <h1>Subject</h1>
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
                <PersonIcon sx={styleAddIcon} style={{color: "white"}}/>
              </Avatar>
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h4>
                      Names:
                    </h4>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled
                      // InputProps={{
                      //   readOnly: true,
                      //   disableUnderline: true
                      // }}
                      label={datosArray[0].col1}
                      // label={nombreCensurado}

                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled

                      label={datosArray[0].col2}
                      // label={apellidoPCensurado}

                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled
                      // label={apellidoMCensurado}

                      label={datosArray[0].col3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    
                    
                    :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                        fullWidth
                        disabled

                        // label='Masculino'
                        label='Not selected'

                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Contact:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField
                      fullWidth
                      disabled

                      label={datosArray[0].col5}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h6" >
                    Birthdate:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomDisabledTextField                  
                      fullWidth
                      disabled
                      label={datosArray[0].col4}
                      />

                  </Grid>
                  <Grid item xs={12}>
                    <h4>
                      Records:
                    </h4>
                  </Grid>

                  <Grid item xs={12}>
                  <TableContainer component={Paper} sx={{ maxHeight: "30vh", overflow: "auto"}}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        {headerGroups.map((headerGroup) => (
                          <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <TableCell
                                {...(column.id === 'selection'
                                  ? column.getHeaderProps()
                                  : column.getHeaderProps(column.getSortByToggleProps()))}
                                  sx={{border: "1px solid rgba(224, 224, 224, 1)", fontWeight: "bold"}}
                              >
                                {column.render('Header')}
                                {column.id !== 'selection' ? (
                                  <TableSortLabel
                                    active={column.isSorted}
                                    // react-table has a unsorted state which is not treated here
                                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                                  />
                                ) : null}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableHead>
                      <TableBody>
                      {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <TableRow
                                {...row.getRowProps()}
                                // onClick={() => onClickRow(row)}
                                className={
                                  row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                                }
                              >
                                {row.cells.map((cell) => (
                                  <><TableCell {...cell.getCellProps()}>{cell.render('Cell')}
                                  
                                  <Button sx={styleButton} onClick={() =>onClickRow(row)}>
                                  <span className="icon-file-excel" style={{ transform: "scale(1.2)" }}></span>
                                  </Button>
              
                                  <Button sx={styleButton} onClick={() =>onClickVer(row)}>
                                    View Signal
                                  </Button>
                                  </TableCell>
                                  </>
                                ))}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </Grid>
                </Grid>
                <br/>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        {/* <section className="display-flex">
          <h5>Nombres(s):</h5>
          <h5 className="second-item">{datosArray[0].col1}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Paterno:</h5>
          <h5 className="second-item">{datosArray[0].col2}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Materno:</h5>
          <h5 className="second-item">{datosArray[0].col3}</h5>
        </section>
        <section className="display-flex">
          <h5>Sexo:</h5>
          <h5 className="second-item">Masculino</h5>
        </section>
        <section className="display-flex">
          <h5>Fecha de Nacimiento:</h5>
          <h5 className="second-item">{datosArray[0].col4}</h5>
        </section>
        <section className="display-flex">
          <h5>Peso:</h5>
          <h5 className="second-item">40 kg</h5>
          <h5 style={{ paddingLeft: '10px' }}>Estatura:</h5>
          <h5 className="second-item">1.50 metros</h5>
        </section> */}
        {/* <section className="display-flex">
          <h5>Estado del paciente: </h5>
          <input
            type="text"
            name="nombre"
            required
            style={{ marginLeft: '10px' }}
          />
          <Button sx={styleButton} style={{ marginLeft: '20px' }}>
            Actualizar Estado
          </Button>
        </section> */}
      </div>
      <br />
      
      <br />
      <section className="display-center">
        <Button sx={styleButton} onClick={onClickIrInicio}>
          Return to home
        </Button>
        <Button sx={styleButton} onClick={onClickCaptura}>
          Start new acquisition
        </Button>
        {/* <Button sx={styleButton}>Analisis</Button> */}
      </section>
      <br />
    </div>
  );
};

export default VerPaciente;
