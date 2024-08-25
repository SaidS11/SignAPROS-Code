/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, Column } from 'react-table';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import '../../../../assets/Iconos/style.css';

const MetricsTable = () => {
  // const classes = useClasses(TableStyles);
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    }>
  > = React.useMemo(
    () => [
      {
        Header: 'Names',
        accessor: 'col1',
      },
      {
        Header: 'Paternal Surname',
        accessor: 'col2',
      },
      {
        Header: 'Maternal Surname',
        accessor: 'col3',
      },
      {
        Header: 'Birthdate',
        accessor: 'col4',
      },
      {
        Header: 'Email',
        accessor: 'col5',
      },
    ],
    []
  );
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    { data, columns },
    useGlobalFilter,
    useSortBy
  );
  return (
    <div>
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '70vh',
        }}
      >
        <TableContainer>
          <MaUTable stickyHeader aria-label="sticky table" {...getTableProps()}>
            <TableHead className="head1">
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...(column.id === 'selection'
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps()))}
                      className="shortHeader"
                      style={{
                        fontWeight: 'bold',
                        position: 'sticky',
                        top: '0px',
                      }}
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
                      row.index % 2 === 0
                        ? 'tableElementOdd'
                        : 'tableElementEven'
                    }
                  >
                    {/* onClick={() => onClickRow(row)} */}
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
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
      </div>
    </div>
  );
};

export default MetricsTable;
