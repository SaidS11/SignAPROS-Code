/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import CrearAnalisis from './CrearAnalisis';
import ModalCrearAnalisis from './ModalCrearAnalisis';

interface Config {
  modelo: string;
  algoritmo: string;
}

const CrearAnalisisContainer = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [dataM, setDataM] = useState({});
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();

  // async function preAn() {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.preAnalisisPython();
  // }
  // window.electron.ipcRenderer.preAnalisisP((event: unknown, resp: string) => {
  //   console.log('Esta es', resp);
  //   appDispatch(setPythonResponse(resp));
  //   appDispatch(setIsLoading(false));
  //   navigate('/preAnalisis');
  // });
  async function startAnalysis(tipo: string, params: string, nombre: string) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.analisisPython(
      'Class',
      tipo,
      params,
      nombre,
      '0',
      '0'
    );
  }
  window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    navigate('/resultadosAnalisis');
  });
  async function getParams(params: any) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.selectImplementacionPorNombre(params!.nombre);
  }
  window.electron.ipcRenderer.selectImplementacionPorN(
    (event: any, resp: any) => {
      console.log('Esta es algo', resp);
      appDispatch(setIsLoading(false));
      console.log('Algo', resp[0].algoritmo_ia);
      const { nombre } = resp[0];
      if (resp[0].algoritmo_ia === 'Arbol de Decisión') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('Tree', params, nombre);
      }
      if (resp[0].algoritmo_ia === 'Red Neuronal') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('KNN', params, nombre);
      }
      if (resp[0].algoritmo_ia === 'Maquina de Soporte Vectorial') {
        const params = JSON.stringify(resp[0].parametros);
        startAnalysis('SVM', params, nombre);
      }
    }
  );
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    appDispatch(setAnalisisParams(dataF));
    getParams(dataF);
  };

  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setData(localResp);
    appDispatch(setIsLoading(false));
    // window.Bridge.selectProtocolos();
  }
  // window.Bridge.selectPrs((event: any, resp: any) => {
  //   if (resp.length > 0) {
  //     console.log('si es', resp);
  //     setData(resp);
  //   } else {
  //     // console.log('nada');
  //     setOpen(true);
  //   }
  //   appDispatch(setIsLoading(false));
  //   // appDispatch(setIsLoading(false));
  // });
  async function loadModels() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    const resp: Config[] =
      (await window.electron.ipcRenderer.selectModNom()) as Array<Config>;
    console.log('Esta es', resp);
    if (resp.length > 0) {
      // console.log('si es', resp);
      setDataM(resp);
    } else {
      // console.log('nada');
      setOpen(true);
    }
    appDispatch(setIsLoading(false));
  }
  // async function loadCaracteristicas(params: any) {
  //   appDispatch(setIsLoading(true));
  //   console.log('Getting message');
  //   window.electron.ipcRenderer.selectImplementacionPorNombre(params!.modelo);
  // }
  // window.electron.ipcRenderer.selectImplementacionPorN(
  //   (event: any, resp: any) => {
  //     console.log('Esta es detalles', resp);
  //   }
  // );
  useEffect(() => {
    console.log('updated');
    loadData();
    loadModels();
  }, []);

  return (
    <div>
      <CrearAnalisis data={data} dataM={dataM} onClickNav={onClickNav} />
      {open && <ModalCrearAnalisis open={open} />}
    </div>
  );
};

export default CrearAnalisisContainer;
