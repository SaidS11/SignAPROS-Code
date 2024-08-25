// eslint-disable-next-line import/no-named-as-default
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogProps } from '@mui/material/Dialog';
import {
  setErrorDetails,
  setFallosAlCargar,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import ResultadoEntrenar from './ResultadoEntrenar';
import { AnalisisParamsInterface, apiEndpoint } from '../Utilities/Constants';
import ModalVerMas from '../Utilities/ModalVerMas';
import SaveModelModal from '../Utilities/SaveModelModal';

const obtenerPorcentaje = (valor: string) => {
  const comprobacion = valor.substring(0, 1);
  let precision = '0';
  if (comprobacion === '1') {
    precision = '100';
  } else {
    precision = valor.substring(2, 4);
  }
  return precision;
};

const ResultadoEntrenarContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const resp = useCustomSelector((state) => state.responses.pythonResponse);
  const predictMode = useCustomSelector((state) => state.señales.predictMode);
  const analisis = useCustomSelector(
    (state) => state.config.analisisParams
  ) as AnalisisParamsInterface;
  const selectedModels = useCustomSelector(
    (state) => state.config.selectedModels
  );
  const algoritmoUsado = analisis.algoritmo;
  const protocoloUsado = analisis.protocolo;
  const nombreSeleccionado = selectedModels[0].col1;
  const algoritmoSeleccionado = selectedModels[0].col2;

  const appDispatch = useCustomDispatch();
  console.log('Recibi esto', resp);
  const parsedResp = resp.split('|');
  console.log('Parsed', parsedResp);

  const precision = obtenerPorcentaje(parsedResp[1]);
  const f1 = obtenerPorcentaje(parsedResp[2]);
  const recall = obtenerPorcentaje(parsedResp[3]);
  const precisionPromedio = parsedResp[4];
  const desviacion = parsedResp[5];
  const respAnalisis = parsedResp[6];
  const banderaExistente = parsedResp[7];
  const precisionPromedioParsed = parseInt(precisionPromedio, 10) * 100;
  const precisionPromParsString = precisionPromedioParsed.toString();
  const crossParsed = `Average precision of ${precisionPromedio} with a standard deviation of ${desviacion}`;
  // "Precision promedio de %0.2f con una desviacion estandar de %0.2f"
  /* if (precision === '00') {
    precision = `${parsedResp[1].substring(1, 1)}00`;
  } */
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [open2, setOpen2] = useState(false);
  const tipo = parsedResp[0];

  const toggleModalVerMas = (scrollType: DialogProps['scroll']) => {
    setOpen(!open);
    setScroll(scrollType);
  };

  const toggleModalGuardar = () => {
    setOpen2(!open2);
  };


  const eliminar = async () => {
    const modeloObj = {
      nombre: nombreSeleccionado,
    };
    const updateModelo = await fetch(`${apiEndpoint}/deleteModelo`, {
      method: 'DELETE',
      body: JSON.stringify(modeloObj),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async function actualizarModelo() {
    const customResults = {
      Precisión: precision,
      F1: f1,
      Recall: recall,
    };

    const customStrResults = JSON.stringify(customResults);

    const modeloObj = {
      resultados: customStrResults,
      entrenado: '1',
      nombre: nombreSeleccionado,
    };
    const updateModelo = await fetch(`${apiEndpoint}/actualizarModelo`, {
      method: 'PATCH',
      body: JSON.stringify(modeloObj),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("RESPUESTA UPD", updateModelo);

    if (updateModelo.status === 500) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(
        setErrorDetails(
          `Problem while adding the configuration: ${updateModelo.statusText}`
        )
      );
      return;
    }
    appDispatch(setIsUploaded(true));
  }

  async function insertModelo() {
    const customResults = {
      Precisión: precision,
      F1: f1,
      Recall: recall,
    };

    const customStrResults = JSON.stringify(customResults);

    const implementacionObj = {
      nombre: nombreSeleccionado,
      algoritmo_ia: algoritmoSeleccionado,
      protocolo: protocoloUsado,
      entrenado: true,
      resultados: customStrResults,
    };
    const insertModeloRequest = await fetch(`${apiEndpoint}/insertarModelo`, {
      method: 'POST',
      body: JSON.stringify(implementacionObj),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("RESPUESTA", insertModeloRequest);
    if (insertModeloRequest.status === 500) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(
        setErrorDetails(
          `Problem while adding the configuration: ${insertModeloRequest.statusText}`
        )
      );
      return;
    }
    appDispatch(setIsUploaded(true));
  }

  // async function updateData() {
  //   appDispatch(setIsLoading(true));
  //   window.electron.ipcRenderer.updateImplementacion(
  //     precisionPromParsString,
  //     desviacion,
  //     '1',
  //     'nombre asignado'
  //   );
  // }
  // window.electron.ipcRenderer.updateIm((event: any, respLocal: any) => {
  //   console.log('Esta es', respLocal);
  //   appDispatch(setIsLoading(false));
  //   appDispatch(setIsUploaded(true));
  // });

  const onClickSave = useCallback(async () => {
    // toggleModalGuardar()
    // setOpen2(!open2);
    appDispatch(setIsLoading(true));
    if (banderaExistente === 'true') {
      await actualizarModelo();
    } else {
      await insertModelo();
    }
    setIsSaved(true);
    appDispatch(setIsLoading(false));

    // navigate('/video');
    // updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };
  const onClickBack = () => {
    console.log("Clicked")
    eliminar();
    navigate('/entrenar');
  };

  const onClickPredict = () => {
    navigate('/guardarModelo');
  };
  const onClickCambiar = () => {
    if (isSaved !== true) {
      toggleModalGuardar();
    } else {
      navigate('/guardarModelo');
    }
  };

  return (
    <div>
      <ResultadoEntrenar
        onClickSave={onClickSave}
        onClickProbar={onClickProbar}
        onClickDetener={onClickDetener}
        probando={probando}
        onClickBack={onClickBack}
        onClickPredict={onClickPredict}
        precision={precision}
        f1={f1}
        recall={recall}
        crossParsed={crossParsed}
        analisis={analisis}
        tipo={tipo}
        respAnalisis={respAnalisis}
        toggleModalVerMas={toggleModalVerMas}
        onClickCambiar={onClickCambiar}
        predictMode={predictMode}
        eliminar={eliminar}
      />
      {open && (
        <ModalVerMas
          toggleModalVerMas={toggleModalVerMas}
          open={open}
          tipo={tipo}
          scroll={scroll}
        />
      )}
      {open2 && (
        <SaveModelModal toggleModalGuardar={toggleModalGuardar} open={open2}  nombreSeleccionado={nombreSeleccionado} eliminar={eliminar}/>
      )}
    </div>
  );
};

export default ResultadoEntrenarContainer;
