import React, { useCallback, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setAnalisisParams,
  setConfigCompleta,
} from '../../../redux/slices/ConfiguracionSlice';
import { setErrorDetails, setErrorNSplits, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import GuardarModelo from './GuardarModelo';
import { AnalisisParamsInterface } from '../Utilities/Constants';
import ErrorNSplitsModal from '../Utilities/ErrorNSplitsModal';

interface Config {
  algoritmo: string;
}

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

const GuardarModeloContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const analisisParams = useCustomSelector(
    (state) => state.config.analisisParams
  ) as AnalisisParamsInterface;
  const predictMode = useCustomSelector((state) => state.señales.predictMode);

  const errorNSplits = useCustomSelector((state) => state.status.errorNSplits);


  const selectedModels = useCustomSelector((state) => state.config.selectedModels);


  const [open, setOpen] = useState(true);
  const [kFolds, setKFolds] = useState("")
  const [porcentaje, setPorcentaje] = useState("")

  const selectedProtocol = analisisParams.protocolo;
  const [algoritmo, setAlgoritmo] = useState('');
  const [algoritmoTipo, setAlgoritmoTipo] = useState('');
  const [modelosEncontrados, setMdelosEncontrados] = useState(false);
  const [nombre, setNombre] = useState('');


  const [dataAlgoritmo, setDataAlgoritmo] = useState<any>([]);
  const [data, setData] = useState<Cols[]>([]);
  const datarRetrieved: Cols[] = [];

  // appDispatch(setAnalisisParams(dataF));

  const toggleModal = () => {
    if (kFolds === "1") {
      alert("Seleccione mas de 1");
      return;
    }
    setOpen(!open);
    appDispatch(setErrorNSplits(false));

    const analisisExpanded = { ...analisisParams };
    analisisExpanded.iteraciones = kFolds;
    analisisExpanded.porcentaje = porcentaje;
    console.log("Algoritmo", algoritmo);
    console.log("PARAMS", analisisExpanded);
    appDispatch(setAnalisisParams(analisisExpanded));
  }
  const cancelModal = () => {
    // setKFolds("");
    setOpen(false);
    appDispatch(setErrorNSplits(false));

  }
  const columns: Array<Column<Cols>> = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1',
      },
      {
        Header: 'Algorithm',
        accessor: 'col2',
      },
      {
        Header: 'Experiment',
        accessor: 'col3',
      },
      {
        Header: 'Trained',
        accessor: 'col4',
      },
      {
        Header: 'Results',
        accessor: 'col5',
      },
    ],
    []
  );

  const loadAlgos = useCallback(async () => {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));

    const resp = await window.electron.ipcRenderer.selectAlgos();
    console.log('Este es algo', resp);
    if (resp.length > 0) {
      setDataAlgoritmo([...resp]);
    }
    appDispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parametrosString = (obj: any) => {
    if (obj == null) {
      return 'null';
    }

    console.log('received', obj);
    const returnValue = Object.entries(obj)
      .map(([propiedad, valor]) => `${propiedad}: ${valor}`)
      .join(', ');
    return returnValue;
    // return "hola"
  };

  const loadModels = useCallback(async () => {
    console.log('Fui llamado Models', algoritmoTipo);
    console.log('Predict', predictMode);
    console.log('Selected', selectedProtocol);


    appDispatch(setIsLoading(true));
    let respModelo;
    if (predictMode) {
      respModelo = await window.electron.ipcRenderer.selectModIAPorAlgoritmoEnt(
        algoritmoTipo
      );
    } else {
      respModelo = await window.electron.ipcRenderer.selectModIaPorAlgoritmo(
        algoritmoTipo
      );
    }
    if (respModelo.length > 0) {
      for (let i = 0; i < respModelo.length; i += 1) {
        // const localString =  JSON.stringify(respModelo[i].resultados);
        const localString = parametrosString(respModelo[i].resultados);
        console.log('entre', respModelo[i].entrenado);
        datarRetrieved.push({
          col1: respModelo[i].nombre,
          col2: respModelo[i].algoritmo_ia,
          col3: respModelo[i].protocolo,
          col4: respModelo[i].entrenado.toString(),
          col5: localString,
        });
      }
      setMdelosEncontrados(true);
      setData(datarRetrieved);
    } else {
      setMdelosEncontrados(false);
    }
    console.log('Este es modelo', respModelo);
    console.log('data', datarRetrieved);
    appDispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoritmoTipo]);

  useEffect(() => {
    loadAlgos();
    setPorcentaje(analisisParams.porcentaje)
    setKFolds(analisisParams.iteraciones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoritmoTipo]);

  const onClickContinue = () => {
    // e.preventDefault();
    console.log(selectedModels, modelosEncontrados, algoritmo);
    if (selectedModels.length === 0 && modelosEncontrados === true) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Select at least one model`));
    } else if(modelosEncontrados === false && nombre === '') {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Select a name`));
    }
  
    else {
      const analisisExpanded = { ...analisisParams };
      analisisExpanded.algoritmo = algoritmo;
      console.log("Algoritmo", algoritmo);
      console.log("PARAMS", analisisExpanded);
      appDispatch(setAnalisisParams(analisisExpanded));
      navigate('/preAnalisis');
    }
  };

  const onClickBack = () => {
    navigate('/entrenar');
  };

  return (
    <>
      <GuardarModelo
        dataAlgoritmo={dataAlgoritmo}
        algoritmo={algoritmo}
        setAlgoritmo={setAlgoritmo}
        setAlgoritmoTipo={setAlgoritmoTipo}
        modelosEncontrados={modelosEncontrados}
        data={data}
        columns={columns}
        selectedProtocol={selectedProtocol}
        setData={setData}
        onClickContinue={onClickContinue}
        onClickBack={onClickBack}
        algoritmoTipo={algoritmoTipo}
        setNombre={setNombre}
      />
      {
        errorNSplits && <ErrorNSplitsModal open={open} toggleModal={toggleModal} cancelModal={cancelModal} setKfolds={setKFolds}  kFolds={kFolds} setPorcentaje={setPorcentaje} porcentaje={porcentaje}/>
      }
    </>
  );
};

export default GuardarModeloContainer;
