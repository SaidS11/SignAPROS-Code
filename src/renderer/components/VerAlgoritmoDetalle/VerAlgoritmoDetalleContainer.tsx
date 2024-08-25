import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import VerImplementacion from './VerAlgoritmoDetalle';

const VerAlgoritmoDetalleContainer = () => {
  const nombre = useCustomSelector((state) => state.config.algoritmoIA);
  const appDispatch = useCustomDispatch();
  interface Cols {
    col1: string;
  }
  const [data, setData] = useState<Cols[]>([]);
  const datarRetrieved: Cols[] = [];
  async function loadData(name: string) {
    appDispatch(setIsLoading(true));
    window.electron.ipcRenderer.selectImplementacionNombreIA(name);
  }
  window.electron.ipcRenderer.selectImplemenIA((event: any, resp: any) => {
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i += 1) {
        datarRetrieved.push({
          col1: resp[i].nombre,
        });
      }
      setData(datarRetrieved);
    } else {
    }
    appDispatch(setIsLoading(false));
  });
  useEffect(() => {
    loadData(nombre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Modelo',
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

  return <VerImplementacion nombre={nombre} options={options} />;
};

export default VerAlgoritmoDetalleContainer;
