/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
// import { lighten, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import GlobalFilter from './GlobalFilter';

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }))

const useToolbarStyles = (theme) => ({
  // root: {
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(1),
  // },
  highlight: {
    color: 'blue',
    backgroundColor: 'red',
  },
  // theme.palette.type === 'light'
  //   ? {
  //       color: theme.palette.secondary.main,
  //       backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //     }
  //   : {
  //       color: theme.palette.text.primary,
  //       backgroundColor: theme.palette.secondary.dark,
  //     },
  title: {
    flex: '1 1 100%',
  },
});

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, preGlobalFilteredRows, setGlobalFilter, globalFilter } =
    props;
  return (
    <Toolbar 
    // className={numSelected > 0 ? 'highlight' : ''}
    >
      {/* {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Pacientes
        </Typography>
      )} */}
      {/* {
        numSelected > 0 &&
        <Typography
        // className={classes.title}
        // color="inherit"
        // variant="subtitle1"
        >
          {numSelected} seleccionados
        </Typography>
      }
      <br></br> */}

      <Typography className={classes.title} variant="h6" id="tableTitle">
                Subjects
      </Typography>

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" />
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )} */}
      <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.arrayOf.isRequired,
  globalFilter: PropTypes.string.isRequired,
};

export default TableToolbar;
