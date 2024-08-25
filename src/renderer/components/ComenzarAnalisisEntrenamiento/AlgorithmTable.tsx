/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
} from 'react-table';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Algoritmo } from '../Utilities/Constants';

interface GeneralTableProps {
  data: any;
}

const GeneralTable = (props: GeneralTableProps) => {
  const { data } = props;

  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
    }>
  > = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1',
      },
      {
        Header: 'Type',
        accessor: 'col2',
      },
      {
        Header: 'Description',
        accessor: 'col3',
      },
      {
        Header: 'Parameters',
        accessor: 'col4',
      },
    ],
    []
  );
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
  }

  
  //   setData(mappedJSON);
  const options: TableOptions<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
  }> = {
    data,
    columns,
  };

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns }, useSortBy);
  return (
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
                    className="shortHeader"
                    style={{
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: '0px',
                    }}
                  >
                    {column.render('Header')}
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
  );
};

export default GeneralTable;
