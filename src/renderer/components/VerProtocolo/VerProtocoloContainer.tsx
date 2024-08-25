/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { TableOptions, Column } from 'react-table';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerProtocolo from './VerProtocolo';
import { setProtocoloDetalle } from '../../../redux/slices/ConfiguracionSlice';

const VerProtocoloContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  interface Cols {
      col1: string;
    }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Experiment',
        accessor: 'col1',
      },
    ],
    []
  );
  const datarRetrieved: Cols[] = [];

  // Load Data for the rows
  async function loadData() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    const resp = await window.electron.ipcRenderer.selectPrs();
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i+=1) {
        datarRetrieved.push({
          col1: resp[i].nombre,
        });
      }
      setData(datarRetrieved);
    }
    appDispatch(setIsLoading(false));

    // window.Bridge.selectProtocolos();
  }

  async function loadDataDetalle(nameProtocolo: string) {
    appDispatch(setIsLoading(true));
    window.Bridge.selectProtocoloDetalle(nameProtocolo);
  }
  window.Bridge.selectPD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('Este es el detalle click', resp);
      appDispatch(setProtocoloDetalle(resp));
    } else {
      console.log('nada en detalle');
    }
    appDispatch(setIsLoading(false));
    navigate('/verProtocoloDetalle');
  });

  const onClickRow = useCallback((element: any) => {
    console.log(element);
    console.log(element.cells);
    // console.log(element.cells[0].value)
    /* appDispatch(setConfigName(element.cells[0].value)); */
    loadDataDetalle(element.cells[0].value);
  }, []);

  useEffect(() => {
    loadData();
  }, []);
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  return <VerProtocolo options={options} onClickRow={onClickRow} />;
};

export default VerProtocoloContainer;
