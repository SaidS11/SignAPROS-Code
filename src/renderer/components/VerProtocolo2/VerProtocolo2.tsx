/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './VerProtocolo2.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import { InputLabel, FormControl, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { styleButtonBiggerGreen, styleAddIcon } from '../VerPaciente/ButtonStyle';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { CustomDisabledSelect, CustomDisabledTextField } from '../Utilities/Constants';

interface VerProtocolo2Props {
  options: TableOptions<{ col1: string }>;
  resp: any;
  onClickIrRegresar: () => void;
  largo: any;
}

const VerProtocolo2 = (
  props: VerProtocolo2Props
) => {
  const { options, resp, onClickIrRegresar, largo } = props;
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
        <h1>Experiment</h1>
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
                  {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddIcon sx={styleAddIcon} style={{color: "white"}}/>
                  </Avatar> */}
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CustomDisabledTextField
                          disabled
                          fullWidth
                          value={resp[0].nombre}
                          label="Name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomDisabledTextField
                          disabled
                          fullWidth
                          label="Description"
                          value={resp[0].descripcion === null ? "..." : resp[0].descripcion}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="h1" variant="h6" >
                        Selected configuration:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Configuration</InputLabel>
                          <CustomDisabledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="configuracion"
                            label="Configuration"
                            value={resp[0].configuracion}
                            required
                            disabled
                          >
                            <MenuItem key={resp[0].configuracion} value={`${resp[0].configuracion}`}>{resp[0].configuracion}</MenuItem>
                          </CustomDisabledSelect>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        Records linked with the protocol:
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                      <Grid item xs={12} >
                      <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto"}}>
                        <Table stickyHeader  sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    className={
                                      row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                                    }
                                  >
                                    {row.cells.map((cell) => (
                                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    ))}
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h5" >
                        <h5>Total: </h5>{' '}
                        <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>{largo}</h5>
                        </Typography>
                      </Grid>
                    </Grid>
                    <br/>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
    </div>
  );
};

export default VerProtocolo2;
