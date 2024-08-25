/* eslint-disable prettier/prettier */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import VerAnalisis from './VerAnalisis';

const VerAnalisisContainer = () => {
    interface Cols {
        col1: string;
      }
      const data = React.useMemo(
        (): Cols[] => [
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
    
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
    
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
          {
            col1: 'Analisis 1',
          },
          {
            col1: 'Analisis 2',
          },
        ],
        []
      );
      const columns: Array<Column<{ col1: string }>> = React.useMemo(
        () => [
          {
            Header: 'Records',
            accessor: 'col1',
          },
        ],
        []
      );
      const options: TableOptions<{
        col1: string;
      }> = {
        data,
        columns,
      };


  return (
    <div>
      <VerAnalisis options={options}/>
    </div>
  );
};

export default VerAnalisisContainer;
