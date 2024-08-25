import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import {
  setConfigName,
  setConfigDetalle,
  setConfigMultimedia,
} from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerConfiguracion from './VerConfiguracion';

// import { useNavigate } from "react-router-dom";
interface Config {
  nombre: string;
}

interface Cols {
  col1: string;
}

const VerConfiguracionContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Configurations',
        accessor: 'col1',
      },
    ],
    []
  );
  const datarRetrieved: Cols[] = [];

  // Load Data for the rows
  async function loadData() {
    appDispatch(setIsLoading(true));
    const resp: Config[] =
      (await window.electron.ipcRenderer.selectC()) as Array<Config>;
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i += 1) {
        datarRetrieved.push({
          col1: resp[i].nombre,
        });
      }
      setData(datarRetrieved);
    }
    appDispatch(setIsLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function loadDataMultimedia(nameConf: string, resp: any) {
    const respMulti = await window.electron.ipcRenderer.selectMC(nameConf);
    return respMulti;
  }

  async function loadDataDetalle(nameConf: string) {
    const resp = await window.electron.ipcRenderer.selectCD(nameConf);
    return resp;
  }

  const onClickRow = useCallback(async (element: any) => {
    appDispatch(setIsLoading(true));
    const respuesta = await loadDataDetalle(element.cells[0].value);
    const respuestaMultimedia = await loadDataMultimedia(
      respuesta[0].nombre,
      respuesta
    );
    appDispatch(setConfigName(element.cells[0].value));
    appDispatch(setConfigDetalle(respuesta));
    appDispatch(setConfigMultimedia(respuestaMultimedia));
    appDispatch(setIsLoading(false));
    navigate('/verConfiguracionDetalle');
  }, []);

  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };

  return <VerConfiguracion options={options} onClickRow={onClickRow} />;
};

export default VerConfiguracionContainer;
