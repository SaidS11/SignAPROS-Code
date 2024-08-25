/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
import { useTable, useSortBy, usePagination } from 'react-table';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TableSortLabel from '@mui/material/TableSortLabel';
import React, { useState } from 'react';
import MaUTable from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


interface Cols {
  nombre?: string;
  // EMG's
  colMediaABSEMG1?: string;
  colMedianaEMG1?: string;
  colRMSEMG1?: string;

  colMediaABSEMG2?: string;
  colMedianaEMG2?: string;
  colRMSEMG2?: string;

  colMediaABSEMG3?: string;
  colMedianaEMG3?: string;
  colRMSEMG3?: string;

  colMediaABSEMG4?: string;
  colMedianaEMG4?: string;
  colRMSEMG4?: string;
  // TEMP
  colMediaABSAcelerometro?: string;
  colMedianaAcelerometro?: string;
  colRMSAcelerometro?: string;
  // GSR
  colMediaABSGsr?: string;
  colMedianaGsr?: string;
  colRMSGsr?: string;
  // SPO2
  colMediaABSFrecuencia?: string;
  colMedianaFrecuencia?: string;
  colRMSFrecuencia?: string;

  // Clase
  etiqueta?: string;
}

interface ResultsProps {
  options: any;
  dataInitial: any;
  columns: any;
}

const initialHidden = (cols: any) => {
  const helperArray: string[] = [];
  cols.map((column: any) => {
    if (column.show === false) {
      column.columns.map((col: any) => helperArray.push(col.accessor));
    }
  });
  return helperArray;
};
const ResultsTable = (props: ResultsProps) => {
  const { dataInitial, columns , options} = props;
  const [currentLabel, setCurrentLabel] = useState('Expand');

  const defaultTheme = createTheme();


  function prepareShortData() {
    if (currentLabel === 'Expand') {
      const shortData: { nombre: any; etiqueta: any }[] = [];
      const tablaHash = new Map();
      dataInitial.map((registro: any) => {
        if (tablaHash.has(registro.nombre)) {
          const prev = tablaHash.get(registro.nombre);
          tablaHash.set(registro.nombre, [...prev, registro]);
        } else {
          tablaHash.set(registro.nombre, [registro]);
        }
      });
      const tablaHashEtiquetas = new Map();
      tablaHash.forEach((value, key) => {
        value.map((registro: any) => {
          if (tablaHashEtiquetas.has(registro.etiqueta)) {
            const prev = tablaHashEtiquetas.get(registro.etiqueta);
            tablaHashEtiquetas.set(registro.etiqueta, prev + 1);
          } else {
            tablaHashEtiquetas.set(registro.etiqueta, 1);
          }
        });
        let maxKey;
        let maxValue = -Infinity;

        for (const [key, value] of tablaHashEtiquetas) {
          if (value > maxValue) {
            maxKey = key;
            maxValue = value;
          }
        }
        shortData.push({ nombre: key, etiqueta: maxKey });
        tablaHashEtiquetas.clear();
      });
      const preparedData = shortData;
      return preparedData;
    }
    return dataInitial;
  }

  const dataParsed = prepareShortData();
  const data = React.useMemo(
    (): Cols[] => [...dataParsed],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLabel]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    allColumns,
    visibleColumns,
  } = useTable(
    // options,
    {
      columns,
      data,
      initialState: {
        hiddenColumns: initialHidden(columns),
        // hiddenColumns: columns.map((column: any) => {
        //     if (column.show === false) return column.accessor;
        // }),
        // hiddenColumns: ["nombre"]
      },
    },
    useSortBy,
    usePagination,
  );
    console.log("Columnas Vi", visibleColumns);
    console.log("All column", allColumns)

  const setStatus = () => {
    if (visibleColumns.length === 2) {
      allColumns.map((column) => {
        column.toggleHidden(false);
      });
      setCurrentLabel('Retract');
    } else {
      allColumns.map((column) => {
        if (column.id !== 'nombre' && column.id !== 'etiqueta') {
          column.toggleHidden(true);
        }
      });
      setCurrentLabel('Expand');
    }
  };
  const sortedColumn = (column: any) => {
    return (
      <TableSortLabel
        active={column.isSorted}
        // react-table has a unsorted state which is not treated here
        direction={column.isSortedDesc ? 'desc' : 'asc'}
      />
    );

  };
  console.log("THIS");
  return (
    <ThemeProvider theme={defaultTheme}>
       <Container maxWidth="lg">

        <CssBaseline />
        <Box
        component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
      
      <FormControlLabel
            control={<Switch />}
            onChange={setStatus}
            label={currentLabel}
          />


          <TableContainer >
          <MaUTable {...getTableProps()} >
            <TableHead >
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...(column.id === 'selection'
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps()))}
                        sx={{border: "1px solid rgba(224, 224, 224, 1)"}}
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
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}
                        sx={{border: "1px solid rgba(224, 224, 224, 1)"}}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaUTable>
        </TableContainer>
        </Box>


        </Container>

      </ThemeProvider>

    
  );
};

export default ResultsTable;
