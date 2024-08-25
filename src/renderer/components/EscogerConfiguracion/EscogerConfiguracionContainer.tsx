/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-named-as-default
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setConfigMultimedia,
  setConfigCompleta,
  setProtocoloNombre,
} from '../../../redux/slices/ConfiguracionSlice';
import { setErrorDetails, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
// eslint-disable-next-line import/no-named-as-default
import EscogerConfiguracion from './EscogerConfiguracion';

const EscogerConfiguracionContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [protocolo, setProtocolo] = React.useState('');
  let nameConfig = '';
  console.log('protocolo', protocolo);
  const appDispatch = useCustomDispatch();
  appDispatch(setProtocoloNombre(protocolo));
  // Get All the data from the config
  async function loadConfCompleta(name: string) {
    // appDispatch(setIsLoading(true));
    const resp = await window.electron.ipcRenderer.selectCD(name);
    appDispatch(setConfigCompleta(resp));
    appDispatch(setIsLoading(false));
    navigate('/colocacionMuestra');
  }

  // Get Multimedia to Display
  async function loadMulti(dataP: any) {
    nameConfig = dataP[0].configuracion;
    const respMulti = await window.electron.ipcRenderer.selectMC(nameConfig);
    appDispatch(setConfigMultimedia(respMulti));
    loadConfCompleta(nameConfig);
  }

  // Get data from selected Protocol
  async function loadConf() {
    appDispatch(setIsLoading(true));
    const respConf = await window.electron.ipcRenderer.selectCN(protocolo);
    loadMulti(respConf);
  }

  const onClickNav = () => {
    if (protocolo === '') {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problem while retrieving info: Select a protocol`));
    } else {
      loadConf();
      // navigate('/colocacionMuestra');
    }
  };
  const onClickBack = () => {
    navigate('/verPaciente');
  };
  const onClickAdd = () => {
    navigate('/crearProtocolo');
  };
  const onClickVer = () => {
    navigate('/verProtocolo');
  };

  // Load Protocols
  async function loadData() {
    appDispatch(setIsLoading(true));
    const localResp = await window.electron.ipcRenderer.selectPrs();
    setData(localResp);
    appDispatch(setIsLoading(false));
  }

  useEffect(() => {
    console.log('updated');
    loadData();
  }, []);

  return (
    <div>
      <EscogerConfiguracion
        onClickNav={onClickNav}
        onClickBack={onClickBack}
        onClickAdd={onClickAdd}
        onClickVer={onClickVer}
        data={data}
        protocolo={protocolo}
        setProtocolo={setProtocolo}
      />
    </div>
  );
};

export default EscogerConfiguracionContainer;
