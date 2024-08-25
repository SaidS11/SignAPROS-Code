/* eslint-disable react/jsx-props-no-spreading */
import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import { pink } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';

import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';
import React from 'react';
import './CaracterizarParte2.css';
import TableToolbar from '../ComenzarAnalisisEntrenamiento/TableToolbar';

export interface TableProps {
  options: any;
}

const Table = (props: TableProps) => {
  const { options } = props;

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable(options, useFilters, useSortBy);

    const {
      getTableProps,
      headerGroups,
      prepareRow,
      page,
    } = useTable(
      options,
      useSortBy,
      usePagination,
    );

    
  return (
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
      

  );
};

export default Table;


{/* <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '60vh',
        }}
      >
        <table {...getTableProps()} className="tableCustom">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="tableHeader"
                    style={{ textAlign: 'center' }}
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
                  className={
                    row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                  }
                  style={{ textAlign: 'center', width: '300px' }}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}