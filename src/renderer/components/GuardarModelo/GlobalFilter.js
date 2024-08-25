/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import InputBase from '@mui/material/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="search">
      <div className="searchIcon">
        <SearchIcon />
      </div>
      <InputBase
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} Records...`}
        // classes={{
        //   root: classes.inputRoot,
        //   input: classes.inputInput,
        // }}
        className="inputRoot"
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.arrayOf.isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
