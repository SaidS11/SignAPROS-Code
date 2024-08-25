/* eslint-disable react/jsx-props-no-spreading */
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from '@mui/material';

interface VerConfiguracionProps {
  options: TableOptions<{ col1: string }>;
  onClickRow: (arg0: any) => void;
}

const VerConfiguracion = (props: VerConfiguracionProps) => {
  const { options, onClickRow } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  return (
    <div>
      <section className="display-center">
        <h1>Configurations</h1>
      </section>
      <section className="display-center">
        <h4>Choose one from the list to see more:</h4>
      </section>
      <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}> 
                <Grid item xs={12}>
                <Grid item xs={12}>
                  <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto"}}>
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
                                onClick={() => onClickRow(row)}
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
              </Grid>
            </Box>
          </Box>
        </Container>
    </div>
  );
};

export default VerConfiguracion;
