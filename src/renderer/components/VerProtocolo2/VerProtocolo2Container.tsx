/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import VerProtocolo2 from './VerProtocolo2';
import { PacientesAnalisisMongo } from '../Utilities/Constants';

interface ProtocoloDetalle {
  nombre: string
}
const VerProtocolo2Container = () => {
  const resp = useCustomSelector((state) => state.config.protocoloDetalle) as Array<ProtocoloDetalle>;
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  interface Cols {
      col1: string;
    }
  const [data, setData] = useState<Cols[]>([]);
  const datarRetrieved: Cols[] = [];

  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = { protocol: resp[0].nombre };
    const jsonDocument = JSON.stringify(document);
    try {
        const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
          jsonDocument
        )) as Array<PacientesAnalisisMongo>;
        for (let i = 0; i < pacientes.length; i += 1) {
          datarRetrieved.push({
            col1: pacientes[i].name,
          });
        }
        setData(datarRetrieved);
    } catch (error: any) {
      alert("Error while retrieving data");
    }
    appDispatch(setIsLoading(false));
  }

    const columns: Array<Column<{ col1: string }>> = React.useMemo(
      () => [
        {
          Header: 'Records',
          accessor: 'col1',
        },
      ],
      []
    );
    useEffect(() => {
      loadPacientes();
    }, []);
    const options: TableOptions<{
      col1: string;
    }> = {
      data,
      columns,
    };
    const onClickIrRegresar = () => {
      navigate('/verProtocolo');
    };
    const largo = data.length;
  return <VerProtocolo2 options={options} resp={resp} onClickIrRegresar={onClickIrRegresar} largo={largo} />;
};

export default VerProtocolo2Container;
