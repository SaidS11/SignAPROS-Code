// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  setGsrIsChecked,
  setAcelerometroIsChecked,
  setFrecuenciaIsChecked,
  setExtraSensorsChecked,
} from 'redux/slices/SeñalesSlice';
import { setConfigCompleta } from '../../../redux/slices/ConfiguracionSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import ColocacionMuestra from './ColocacionMuestra';
import { apiEndpoint } from '../Utilities/Constants';

const ColocacionMuestraContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );
  const confObj = useCustomSelector((state) => state.config.configCompleta);
  const selectedProtocol = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  console.log('Aqui llego', multimediaObj);
  console.log('Esta es la config', confObj);

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
    const { gsr } = resp[0];
    const { frecuencia_cardiaca } = resp[0];
    const { acelerometro } = resp[0];
    const { temperatura } = resp[0];
    const { arduinos } = resp[0];


    console.log(
      `This is config EMGS : ${cantidadEmgs}, gsr ${gsr}, frecuencia_cardiaca ${frecuencia_cardiaca}, acelerometro ${acelerometro} temperatura ${temperatura} y ${arduinos}`
    );
    appDispatch(setGsrIsChecked(gsr));
    appDispatch(setAcelerometroIsChecked(acelerometro));
    appDispatch(setFrecuenciaIsChecked(frecuencia_cardiaca));
    appDispatch(
      setExtraSensorsChecked([gsr, acelerometro, frecuencia_cardiaca])
    );
    appDispatch(setIsLoading(false));
    return resp;
  }

  const onClickNav = () => {
    navigate('/videoDemo');
  };
  const onClickBack = () => {
    navigate('/escogerConfiguracion');
  };
  appDispatch(setIsLoading(true));
  const urlRetrieved = `${multimediaObj[0].link_imagen}`;
  const url = urlRetrieved.includes('http')
    ? urlRetrieved
    : `${apiEndpoint}/${multimediaObj[0].link_imagen}`;
  console.log(url);
  appDispatch(setIsLoading(false));

  useEffect(() => {
    loadConfig();
  }, []);
  return (
    <div>
      <ColocacionMuestra
        onClickNav={onClickNav}
        onClickBack={onClickBack}
        url={url}
      />
    </div>
  );
};

export default ColocacionMuestraContainer;
