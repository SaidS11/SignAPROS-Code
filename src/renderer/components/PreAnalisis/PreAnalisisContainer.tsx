/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setErrorDetails, setErrorNSplits, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import PreAnalisis from './PreAnalisis';
import PreAnalisisBlank from './PreAnalisisBlank';
import { apiEndpoint } from '../Utilities/Constants';

const PreAnalisisContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const paramsArg = useCustomSelector((state) => state.config.analisisParams);
  const datos = useCustomSelector((state) => state.señales.datosAnalisisIA);
  const predictMode = useCustomSelector((state) => state.señales.predictMode);

  const nombresSeleccionados = useCustomSelector(
    (state) => state.config.selectedModels
  );

  console.log('DATOS PREVIOS', datos);
  const strData = JSON.stringify(datos);
  console.log('DATOS STR', strData);


  async function startAnalysis(tipo: string, params: string, nombre: string) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    const { iteraciones, porcentaje } = paramsArg as any;
    
    const predictPayload = {
        "tipo": 'Class',
        "tipoIA": tipo,
        "params": params,
        "nombre": nombre,
        "iteraciones": '0',
        "reducedPercentage": '0',
        "datos": strData
    }

    
  
  let response;
  console.log("PREDICT MODE", predictMode);
  if (predictMode) {
    console.log("PAYLOAD a enviar", predictPayload);

    response = await fetch(`${apiEndpoint}/analisisPython`, {
      method: 'POST',
      body: JSON.stringify(predictPayload),
      headers: {'Content-Type': 'application/json'}
    });
  } else {
      const strPercentage = porcentaje.toString();
      const trainPayload = {
        "tipo": 'Train',
        "tipoIA": tipo,
        "params": params,
        "nombre": nombre,
        "iteraciones": iteraciones,
        "reducedPercentage": strPercentage,
        "datos": strData
    }
    console.log("PAYLOAD a enviar", trainPayload);
    response = await fetch(`${apiEndpoint}/analisisPython`, {
      method: 'POST',
      body: JSON.stringify(trainPayload),
      headers: {'Content-Type': 'application/json'}
    });
  }
  const respBody = await response.json();
  if(respBody.status === 500) {
    
    console.log("JSON Error", respBody);
    appDispatch(setIsLoading(false));
    appDispatch(setFallosAlCargar(true));
    if (respBody.message.length > 180) {
      appDispatch(setErrorDetails(`Problem while processing the info`));
    } else {
      appDispatch(setErrorDetails(`Problem while processing the info: ${respBody.message}`));
      const palabraClave: string = "n_splits";
      const palabraClave2: string = "With n_samples"
      if(respBody.message.includes(palabraClave)){
        appDispatch(setErrorNSplits(true));
      }
      if(respBody.message.includes(palabraClave2)){
        appDispatch(setErrorNSplits(true));
      }
    }
    navigate('/guardarModelo');
  }
  if(respBody.status === 200) {
    appDispatch(setErrorNSplits(false));
    console.log("JSON OK", respBody);
    console.log("Response", respBody.message);
    appDispatch(setPythonResponse(respBody.message));
    appDispatch(setIsLoading(false));
    navigate('/resultadoEntrenar');
    
  }

    // if (predictMode) {
    //   window.electron.ipcRenderer.analisisPython(
    //     'Class',
    //     tipo,
    //     params,
    //     nombre,
    //     '0',
    //     '0',
    //     strData
    //   );
    // } else {
    //   // const reducedPercentage = parseInt(porcentaje) / 100;
    //   const strPercentage = porcentaje.toString();
    //   console.log('THis is STR', strPercentage);
    //   window.electron.ipcRenderer.analisisPython(
    //     'Train',
    //     tipo,
    //     params,
    //     nombre,
    //     iteraciones,
    //     strPercentage,
    //     strData
    //   );
    // }
  }
  window.electron.ipcRenderer.analisisP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    const parsedResp = resp.split('|');
    const checkError = parsedResp[0];
    if (checkError === 'Error') {
      const errorTrace = parsedResp[1];
      alert(`An error happened ${errorTrace}`);
      navigate('/guardarModelo');
      return 0;
    }
    navigate('/resultadoEntrenar');
  });
  async function getParams(params: any) {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.selectImplementacionPorNombre(
      params!.algoritmo
    );
  }
  window.electron.ipcRenderer.selectImplementacionPorN(
    (event: any, resp: any) => {
      console.log('Esta es algo', resp);
      appDispatch(setIsLoading(false));
      console.log('Algo', resp[0].algoritmo_ia);
      // const { iteraciones, porcentaje } = paramsArg as any;
      // const reducedPercentage = parseInt(porcentaje) / 100;
      // const strPercentage = reducedPercentage.toString();
      // console.log('iteraciones y porc', iteraciones, porcentaje);
      // const { nombre } = resp[0];
      const nombre = nombresSeleccionados[0].col1;
      console.log("Nombre", nombre);

      const params = JSON.stringify(resp[0].parametros);
      
      try {
        if (resp[0].algoritmo_ia === 'Arbol de Decisión') {
          startAnalysis('Tree', params, 'Modelo del Habla');
        }
        if (resp[0].algoritmo_ia === 'Red Neuronal') {
          startAnalysis('Red', params, nombre);
        }
        if (resp[0].algoritmo_ia === 'K-Nearest Neighbor') {
          startAnalysis('KNN', params, nombre);
        }
        if (resp[0].algoritmo_ia === 'Maquina de Soporte Vectorial') {
          startAnalysis('SVM', params, nombre);
        }
      } catch (e: any) {
        appDispatch(setIsLoading(false));
        appDispatch(setFallosAlCargar(true));
        appDispatch(setErrorDetails(`Problem while processing the info: ${e}`));
      }
    }
  );
  const onClickNav = () => {
    getParams(paramsArg);
  };
  useEffect(() => {
    getParams(paramsArg);
  }, []);
  return <PreAnalisisBlank />;
  // return (
  //   <div>
  //     <PreAnalisis onClickNav={onClickNav} />
  //   </div>
  // );
};

export default PreAnalisisContainer;
