import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { DialogProps } from '@mui/material/Dialog';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setCleanAllSensors,
  setCleanDatosAnalisisIA,
  setPredictMode,
} from '../../../redux/slices/SeñalesSlice';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setErrorDetails,
  setFallosAlCargar,
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import ComenzarAnalisisEntrenamiento from './ComenzarAnalisisEntrenamiento';
import ModalVerMas from '../Utilities/ModalVerMas';
import { PacientesAnalisisMongo, apiEndpoint } from '../Utilities/Constants';

interface Config {
  modelo: string;
  algoritmo: string;
}

interface paciente {
  col1: string;
  col2: string;
}


function encontrarMenosComun(arr: paciente[]): { valor: string | null, ocurrencias: number } {
  const contador = new Map<string, number>();

  // Contar las ocurrencias de cada valor en "col2"
  arr.forEach((item) => {
    const valorCol2 = item.col2;
    contador.set(valorCol2, (contador.get(valorCol2) || 0) + 1);
  });

  let valorMenosComun: string | null = null;
  let minOcurrencias = Number.POSITIVE_INFINITY;

  // Encontrar el valor con la menor ocurrencia
  contador.forEach((ocurrencias, valor) => {
    if (ocurrencias < minOcurrencias) {
      minOcurrencias = ocurrencias;
      valorMenosComun = valor;
    }
  });

  return { valor: valorMenosComun, ocurrencias: minOcurrencias };
}




// 'Error|n_splits=3 cannot be greater than the number of members in each class.'

const ComenzarAnalisisEntrenamientoContainer = () => {
  const [dataParam, setDataParam] = useState({});
  const [dataAlgoritmo, setDataAlgoritmo] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modelo, setModelo] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );
  // async function preAn() {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.preAnalisisPython();
  // }
  // window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
  //   console.log('Esta es', resp);
  //   // appDispatch(setPythonResponse(resp));
  //   appDispatch(setIsLoading(false));
  //   // navigate('/preAnalisis');
  // });
  const toggleModal = (scrollType: DialogProps['scroll']) => {
    console.log('Seleccionado', modelo);
    const found = dataAlgoritmo.find((el: Config) => el.modelo === modelo);
    console.log('Founded', found);
    // preAn();
    setTipo(found.algoritmo_ia);
    setOpen(!open);
    setScroll(scrollType);
  };
  interface Cols {
    col1: string;
    col2: string;
  }
  const [data, setData] = useState<Cols[]>([]);

  const datarRetrieved: Cols[] = [];

  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = { protocol: protocolo, etiqueta: { $ne: "" } };
    const jsonDocument = JSON.stringify(document);
    console.log('JSON', jsonDocument);
    try {
      // console.log("TRYING")
      // const resPacientes = await fetch(`${apiEndpoint}/buscarElementoMongo`, {
      //   method: 'GET',
      //   body: JSON.stringify(jsonDocument),
      //   headers: {'Content-Type': 'application/json'}
      // });
      // console.log("RespPacientes", resPacientes);

      const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;

      console.log("Retrieved", pacientes)

      for (let i = 0; i < pacientes.length; i += 1) {
        datarRetrieved.push({
          col1: pacientes[i].name,
          col2: pacientes[i].etiqueta,
        });
      }
      setData(datarRetrieved);
    } catch (error: any) {
      console.log('er', error);
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Failed to fetch information, please try again: ${error}`));
    }
    appDispatch(setIsLoading(false));
  }

  const columns: Array<Column<{ col1: string; col2: string }>> = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1',
      },
      {
        Header: 'Label',
        accessor: 'col2',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
    col2: string;
  }> = {
    data,
    columns,
  };

  const onClickStop = async () => {
    await window.electron.ipcRenderer.insertModeloIA(
      'test2',
      'Arbol de Decisión',
      true,
      'Completo',
      '{}'
    );

    const resp = await window.electron.ipcRenderer.selectModIA();
  };

  window.electron.ipcRenderer.insertModIA((event: any, resp: any) => {
    if (resp > 0) {
      console.log('insert', resp[0]);
      if (resp[0] === 0) {
        console.log('Failed', resp[1]);
      }
    } else {
      console.log(resp);
    }
  });
  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setDataParam(localResp);
    appDispatch(setIsLoading(false));
  }

  async function loadAlgos() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    // const resp: Config[] = (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    // const resp =
    //   (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    const resp = await window.electron.ipcRenderer.selectAlgos();
    console.log('Este es algo', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataAlgoritmo([...resp]);
    } else {
      // console.log('nada');
      // setOpen(true);
    }
    appDispatch(setIsLoading(false));
  }

  useEffect(() => {
    console.log('updated');
    loadData();
    loadAlgos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('updated', protocolo);
    loadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolo]);
  
  console.log('lennn', selectedPatients.length);
  console.log('LocalState', selectedPatients);

  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    const numIteraciones = parseInt(dataF.iteraciones.toString());
    // console.log("DATOS", dataF)
    console.log("Pacientes", selectedPatients);

    const { valor, ocurrencias } = encontrarMenosComun(selectedPatients);
    
    
    if (selectedPatients.length <= 1) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Select at least two subjects'));
    }
    else if (numIteraciones >= selectedPatients.length ) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('K Folds can not be less or equal than the number of selected subjects'));
    }
    else {
      if (valor !== null) {
        if (ocurrencias < 2) {
          appDispatch(setFallosAlCargar(true));
          appDispatch(setErrorDetails(`The class with less subjects: ${valor}, can not have less than two members`));
        }
        else if (ocurrencias === selectedPatients.length) {
          appDispatch(setFallosAlCargar(true));
          appDispatch(setErrorDetails(`You must select at least two different classes`));
        }
        else {
          console.log('la data', dataF);
          appDispatch(setPredictMode(false));
          appDispatch(setAnalisisParams(dataF));
          appDispatch(setSignalsIteration(0));
          appDispatch(setCantidadSujetos(selectedPatients.length));
          appDispatch(setCantidadSujetosRespaldo(selectedPatients.length));
          navigate('/caracterizar');
        }
      } 
    }
  };
  useEffect(() => {
    appDispatch(setCleanAllSensors(true));
    appDispatch(setCleanDatosAnalisisIA([]));
  }, []);

  return (
    <div>
      <ComenzarAnalisisEntrenamiento
        tableData={data}
        columnsData={columns}
        data={dataParam}
        dataAlgoritmo={dataAlgoritmo}
        options={options}
        onClickNav={onClickNav}
        onClickStop={onClickStop}
        toggleModal={toggleModal}
        modelo={modelo}
        setModelo={setModelo}
        setProtocolo={setProtocolo}
        protocolo={protocolo}
        setFiltroSexo={setFiltroSexo}
        filtroSexo={filtroSexo}
        // setSelectedPatientsLocal={setSelectedPatientsLocal}
      />
      {open && (
        <ModalVerMas
          toggleModalVerMas={toggleModal}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
    </div>
  );
};

export default ComenzarAnalisisEntrenamientoContainer;
