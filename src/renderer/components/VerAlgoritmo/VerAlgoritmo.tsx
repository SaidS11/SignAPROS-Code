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

interface VerAlgoritmosProps {
  options: TableOptions<{ col1: string }>;
  onClickRow: (arg0: any) => void;
}

const VerAlgoritmo = (props: VerAlgoritmosProps) => {
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
          <h1>Algorithm</h1>
        </section>
        <section className="display-center">
          <h4>Seleccione uno de la lista para ver más detalles:</h4>
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
                  <div
                    style={{
                      width: '100%',
                      overflow: 'auto',
                      maxHeight: '60vh',
                    }}
                  >
                    <table {...getTableProps()} className="tableCustom" style={{border: "1px solid rgba(224, 224, 224, 1)"}}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="tableHeader"
                              >
                                {column.render('Header')}
                                <span>{column.isSorted ? sortedColumn(column) : ''}</span>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => onClickRow(row)}
                              className={
                                row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                              }
                            >
                              {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      
    </div>
  );
};

export default VerAlgoritmo;
