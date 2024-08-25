import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch } from '../../../redux/hooks';
import { setAlgoritmoIA } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import VerAlgoritmo from './VerAlgoritmo';

// import { useNavigate } from "react-router-dom";
interface Config {
  nombre: string;
}
const VerAlgoritmoContainer = () => {
  const navigate = useNavigate();
  interface Cols {
    col1: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const appDispatch = useCustomDispatch();
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Algoritmos Soportados',
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
      (await window.electron.ipcRenderer.selectAIA()) as Array<Config>;
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

  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells[0].value);
    appDispatch(setAlgoritmoIA(element.cells[0].value));
    navigate('/verImplementacion');
  };

  return <VerAlgoritmo options={options} onClickRow={onClickRow} />;
};

export default VerAlgoritmoContainer;
