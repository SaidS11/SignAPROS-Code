/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AddUserDialog from './AddUserDialog';
import GlobalFilter from './GlobalFilter';

const useToolbarStyles = (theme) => ({
  highlight: {
    color: 'blue',
    backgroundColor: 'red',
  },
  title: {
    flex: '1 1 100%',
  },
});

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    addUserHandler,
    selectedProtocol,
    algoritmo,
    algoritmoTipo,
  } = props;

  console.log('selec2', selectedProtocol);
  return (
    <Toolbar className={numSelected > 0 ? 'highlight' : ''}>
      <AddUserDialog
        addUserHandler={addUserHandler}
        selectedProtocol={selectedProtocol}
        algoritmo={algoritmoTipo}
      />
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Modelos
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" />
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addUserHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.arrayOf.isRequired,
  globalFilter: PropTypes.string.isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  algoritmo: PropTypes.string.isRequired,
  algoritmoTipo: PropTypes.string.isRequired,
};

export default TableToolbar;
