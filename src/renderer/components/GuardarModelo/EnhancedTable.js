/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import {
  setSelectedPatients,
  setSelectedModels,
} from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import TableToolbar from './TableToolbar';

const IndeterminateCheckbox = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
};

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input style={inputStyle} value={value} onChange={onChange} />;
};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  // Cell: EditableCell,
};

const EnhancedTable = ({
  columns,
  data,
  selectedProtocol,
  setData,
  algoritmo,
  algoritmoTipo,
  // setSelectedPatientsLocal,
}) => {

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columnsMap) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          //   </div>
          // ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          },
        },
        ...columnsMap,
      ]);
    }
  );
  const appDispatch = useCustomDispatch();

  const findPatientById = (selectedPatients, patientsList) => {
    const newArr = [];
    const keys = Object.keys(selectedPatients);
    const intKeys = keys.map(Number);

    for (let i = 0; i < intKeys.length; i += 1) {
      newArr.push(patientsList[intKeys[i]]);
    }
    // setIsSelected(newArr);
    appDispatch(setSelectedModels(newArr));
    return newArr;
  };

  const find = useMemo(
    () => findPatientById(selectedRowIds, data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRowIds]
  );
  const addUserHandler = (modelo) => {
    const newData = data.concat([modelo]);
    setData(newData);
  };
  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        addUserHandler={addUserHandler}
        selectedProtocol={selectedProtocol}
        algoritmo={algoritmo}
        algoritmoTipo={algoritmoTipo}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
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
                  {
                    if (Object.keys(selectedRowIds).length > 0) {
                      if (cell.row.isSelected) {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </TableCell>
                        );
                      }
                      return <TableCell {...cell.getCellProps()} />;
                    }
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  }
                  // {Object.keys(selectedRowIds).length > 0
                  //   return (
                  //     <TableCell {...cell.getCellProps()}>
                  //       {cell.render('Cell')}
                  //     </TableCell>
                  //   )
                  // }
                  // return (
                  //   <TableCell {...cell.getCellProps()}>
                  //     {cell.render('Cell')}
                  //   </TableCell>
                  // );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  algoritmo: PropTypes.string.isRequired,
  algoritmoTipo: PropTypes.string.isRequired,
  // setSelectedPatientsLocal: PropTypes.array.isRequired,
};

export default EnhancedTable;
