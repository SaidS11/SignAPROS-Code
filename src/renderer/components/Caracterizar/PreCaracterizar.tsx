import { useState, useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import {
  setCantidadSensores,
  setGsrIsChecked,
  setFrecuenciaIsChecked,
  setAcelerometroIsChecked,
  setExtraSensorsChecked,
  setTemperaturaIsChecked,
} from '../../../redux/slices/SeñalesSlice';
import ModalSensoresCaracterizar from './ModalSensoresCaracterizar';
import Caracterizar from './Caracterizar';
import { DataSignalsMongo, FormularioEntrenamiento } from '../Utilities/Constants';

const PreCaracterizar = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [open, setOpen] = useState(false);
  const arr: any = [];

  const selectedPatients = useCustomSelector(
    (state) => state.config.selectedPatients
  );
  
  const currentIteration = 3

  // const currentIteration = useCustomSelector(
  //   (state) => state.status.signalsIteration
  // );

  const formParams = useCustomSelector(
    (state) => state.config.analisisParams
  ) as FormularioEntrenamiento;

  const [sensoresSelected, setSensoresSelected] = useState(0);
  const [emgs, setEmgs] = useState(0);
  const [gsrChecked, setGsrChecked] = useState(false);
  const [frecuenciaChecked, setFrecuenciaChecked] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [respuesta, setRespuesta] = useState<Array<DataSignalsMongo>>([]);
  const [splits, setSplits] = useState(0);

  const [acelerometroChecked, setAcelerometroChecked] = useState(false);
  const [temperaturaChecked, setTemperaturaChecked] = useState(false);


  console.log('Params', formParams);
  const selectedProtocol = formParams.protocolo;
  const appDispatch = useCustomDispatch();
  const toggleModal = () => {
    if (sensoresSelected !== 0) {
      setOpen(!open);
    } else {
      alert('Seleccione una cantidad');
    }
  };
  // return <ProbarSensores onClickAdd={onClickAdd} dataX={dataX} dataY={dataY} />;
  console.log('Seleccionados', sensoresSelected);
  appDispatch(setCantidadSensores(sensoresSelected));

  function amountOfSplits(total: number, divisor: number): number {
    return Math.floor(total / divisor);
  }

  async function loadConfig() {
    appDispatch(setIsLoading(true));

    const respConf = await window.electron.ipcRenderer.selectCN(
      selectedProtocol
    );
    console.log('respconf', respConf[0].configuracion);
    const resp = await window.electron.ipcRenderer.selectCD(
      respConf[0].configuracion
    );
    console.log('this is config', resp);
    const cantidadEmgs = resp[0].emgs;
    setSensoresSelected(cantidadEmgs);
    const { gsr } = resp[0];
    setGsrChecked(resp[0].gsr);
    const { frecuencia_cardiaca } = resp[0];
    setFrecuenciaChecked(resp[0].frecuencia_cardiaca);
    const { acelerometro } = resp[0];
    setAcelerometroChecked(resp[0].acelerometro);
    const { temperatura } = resp[0];
    setTemperaturaChecked(resp[0].temperatura);
    console.log(
      `This is config EMGS: ${cantidadEmgs}, gsr ${gsr}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro}`
    );
    const respuesta =
      (await buscarElementoMongoFront()) as Array<DataSignalsMongo>;

    appDispatch(setGsrIsChecked(gsr));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(setTemperaturaIsChecked(temperatura));

    appDispatch(
      setExtraSensorsChecked([gsr, acelerometro, frecuencia_cardiaca, temperatura])
    );
    setConfigLoaded(true);
    setRespuesta(respuesta);
    let adqWithTimeAndSignals = respuesta[0]
    if(adqWithTimeAndSignals.signals.emg1.length > 6000) {
      const numberOfSplits = amountOfSplits(adqWithTimeAndSignals.signals.emg1.length, 5000);
      setSplits(numberOfSplits);
    }
    appDispatch(setIsLoading(false));

    return resp;
  }
  useEffect(() => {
    loadConfig();
  }, []);

  async function buscarElementoMongoFront() {
    const document = {
      name: selectedPatients[currentIteration].col1,
      // name: "Natanael Hernández Vázquez",
      protocol: selectedProtocol,
    };
    const jsonDocument = JSON.stringify(document);
    const resp = await window.electron.ipcRenderer.buscarElementoM(
      jsonDocument
    );
    console.log("Respuesta recibida", resp);
    return resp;
  }

  const retrieveSignal = async () => {
    appDispatch(setIsLoading(true));

    const respuesta =
      (await buscarElementoMongoFront()) as Array<DataSignalsMongo>;
    return respuesta
  }
  
  

  if (configLoaded) {
    // const respuesta = retrieveSignal();
    // console.log("About to", respuesta);
    return (

      
      <div>
        General View Of Signals
      </div>
    );
  }

  return <div />;
};

export default PreCaracterizar;