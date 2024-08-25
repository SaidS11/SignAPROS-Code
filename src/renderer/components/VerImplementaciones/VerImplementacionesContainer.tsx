import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import VerImplementaciones from './VerImplementaciones';
import { setModeloDetalle } from '../../../redux/slices/ConfiguracionSlice';

// import { useNavigate } from "react-router-dom";
interface Config {
  nombre: string;
}

const VerImplementacionesContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  interface Cols {
    col1: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Implementations',
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
      (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    if (resp.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < resp.length; i++) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };

  async function loadDataDetalle(nameConf: string) {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectImplementacionPorNombre(nameConf);
  }
  window.electron.ipcRenderer.selectImplementacionPorN(
    (event: any, resp: any) => {
      if (resp.length > 0) {
        appDispatch(setModeloDetalle(resp[0]));
      }
      appDispatch(setIsLoading(false));
      navigate('/verModelo');
    }
  );

  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells);
    loadDataDetalle(element.cells[0].value);
  };

  return <VerImplementaciones options={options} onClickRow={onClickRow} />;
};

export default VerImplementacionesContainer;
