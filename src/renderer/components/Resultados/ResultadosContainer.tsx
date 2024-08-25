import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setMongoInsertObject } from 'redux/slices/SeñalesSlice';
import {
  setFailUpload,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import Resultados from './Resultados';
import SaveEtiquetaModal from '../Utilities/SaveEtiquetaModal';
import { apiEndpoint } from '../Utilities/Constants';

interface ConfLocal {
  emgs: number;
}

const ResultadosContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleModalGuardar = () => {
    setOpen(!open);
  };
  const appDispatch = useCustomDispatch();
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  const nombreProtocolo = useCustomSelector(
    (state) => state.config.protocoloNombre
  );
  const sensoresSelected = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const totalSensores = useCustomSelector(
    (state) => state.señales.totalSensores
  );

  const emgDataAdquirida = useCustomSelector(
    (state) => state.señales.emgDataAdquirida
  );

  const arduinoDataAdquirida = useCustomSelector(
    (state) => state.señales.arduinoDataAdquirida
  );

  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const objetoMongo = useCustomSelector(
    (state) => state.señales.mongoInsertObject
  );
  const gsrChecked = useCustomSelector(
    (state) => state.señales.gsrIsChecked
  );
  const acelerometroChecked = useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  const frecuenciaChecked = useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );

  const temperaturaChecked = useCustomSelector(
    (state) => state.señales.temperaturaIsChecked
  );

  const datosPaciente = useCustomSelector((state) => state.datos.datosPaciente);

  const protocolo = useCustomSelector((state) => state.config.protocoloNombre);



  const [gsrDataX, setGsrDataX] = useState([0]);
  const [gsrDataY, setGsrDataY] = useState([0]);

  const [acelerometroInclXDataX, setAcelerometroInclXDataX] = useState([0]);
  const [acelerometroInclXDataY, setAcelerometroInclXDataY] = useState([0]);

  const [acelerometroInclYDataX, setAcelerometroInclYDataX] = useState([0]);
  const [acelerometroInclYDataY, setAcelerometroInclYDataY] = useState([0]);

  const [acelerometroInclZDataX, setAcelerometroInclZDataX] = useState([0]);
  const [acelerometroInclZDataY, setAcelerometroInclZDataY] = useState([0]);

  const [frecuenciaDataX, setFrecuenciaDataX] = useState([0]);
  const [frecuenciaDataY, setFrecuenciaDataY] = useState([0]);

  const [temperaturaDataX, setTemperaturaDataX] = useState([0]);
  const [temperaturaDataY, setTemperaturaDataY] = useState([0]);

  const [isDataReady, setIsDataReady] = useState(false);
  const [grid, setGrid] = useState<any>([]);
  const [data, setData] = useState([]);


  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickBack = () => {
    navigate('/buscarPaciente');
    // if (probando === true) {
    //   setProbando(false);
    // }
  };
  const señales = {
    sensor0: '[]',
  };
  async function insertRegistro() {
    window.Bridge.insertRegistro(
      señales,
      '2022-01-20',
      usuario,
      nombreProtocolo
    );
  }
  window.Bridge.insertR((event: any, resp: any) => {
    if (resp[0] === 0) {
      console.log('Despacho error', resp[1]);
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
    } else {
      console.log('Correcto');
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
      navigate('/verPaciente');
    }
  });
  const onClickGuardar = () => {
    // insertRegistro();
  };

  const [dataXEmg1, setDataXEmg1] = useState([0]);
  const [dataYEmg1, setDataYEmg1] = useState([0]);
  const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'blue' },
    // marker: { color: colors1 },
    mode: 'markers+lines',
    name: 'EMG1',
  };

  const [dataX2Emg2, setDataX2Emg2] = useState([0]);
  const [dataY2Emg2, setDataY2Emg2] = useState([0]);
  const trace2 = {
    x: dataX2Emg2,
    y: dataY2Emg2,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    // mode: 'lines+markers',
    // mode:'markers',
    line: { color: 'skyblue' },
    // With each click a push to the colors array must be added to keep adding colors
    // marker: { color: colors2 },
    mode: 'markers+lines',
    name: 'EMG2',
  };

  const [dataX3Emg3, setDataX3Emg3] = useState([0]);
  const [dataY3Emg3, setDataY3Emg3] = useState([0]);
  const trace3 = {
    x: dataX3Emg3,
    y: dataY3Emg3,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
    line: { color: 'cyan' },
    // marker: { color: colors3 },
    mode: 'markers+lines',
    name: 'EMG3',
  };

  const [dataX4Emg4, setDataX4Emg4] = useState([0]);
  const [dataY4Emg4, setDataY4Emg4] = useState([0]);
  const trace4 = {
    x: dataX4Emg4,
    y: dataY4Emg4,
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter',
    line: { color: 'black' },
    // marker: { color: colors4 },
    mode: 'markers+lines',
    name: 'EMG4',
  };

  // const [dataX5, setDataX5] = useState([0]);
  // const [dataY5, setDataY5] = useState([0]);
  const trace5 = {
    x: gsrDataX,
    y: gsrDataY,
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter',
    line: { color: 'gray' },
    // mode: 'markers+lines',
    name: 'Gsr',
  };

  // const [dataX6, setDataX6] = useState([0]);
  // const [dataY6, setDataY6] = useState([0]);
  const trace6 = {
    x: frecuenciaDataX,
    y: frecuenciaDataY,
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter',
    line: { color: 'red' },
    // mode: 'markers+lines',
    name: 'Frequency',
  };

  const trace7 = {
    x: temperaturaDataX,
    y: temperaturaDataY,
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter',
    line: { color: 'orange' },
    // mode: 'markers+lines',
    name: 'Temperature',
  };

  // const [dataX7, setDataX7] = useState([0]);
  // const [dataY7, setDataY7] = useState([0]);
  const trace8 = {
    x: acelerometroInclXDataX,
    y: acelerometroInclXDataY,
    xaxis: 'x8',
    yaxis: 'y8',
    type: 'scatter',
    line: { color: 'yellow' },
    // mode: 'markers+lines',
    name: 'INCLX',
  };

  const [dataX8, setDataX8] = useState([0]);
  const [dataY8, setDataY8] = useState([0]);
  const trace9 = {
    x: acelerometroInclYDataX,
    y: acelerometroInclYDataY,
    xaxis: 'x9',
    yaxis: 'y9',
    type: 'scatter',
    line: { color: 'green' },
    name: 'INCLY',
  };
  const trace10 = {
    x: acelerometroInclZDataX,
    y: acelerometroInclZDataY,
    xaxis: 'x10',
    yaxis: 'y10',
    type: 'scatter',
    line: { color: 'brown' },
    name: 'INCLZ',
  };

  const [signalRetrieved, setSignalRetrieved] = useState(false);
  const retrieveSignal = () => {
    console.log("RECEIVED", objetoMongo.signals)
    const { emg1 } = objetoMongo.signals;
    const { emg2 } = objetoMongo.signals;
    const { emg3 } = objetoMongo.signals;
    const { emg4 } = objetoMongo.signals;
    const { INCLX } = objetoMongo.signals;
    const { INCLY } = objetoMongo.signals;
    const { INCLZ } = objetoMongo.signals;
    const { GSR } = objetoMongo.signals;
    const { HRLM } = objetoMongo.signals;
    const { TC } = objetoMongo.signals;


    const xArrayEmg1 = [];
    const yArrayEmg1 = [];

    const xArray2Emg2 = [];
    const yArray2Emg2 = [];

    const xArray3Emg3 = [];
    const yArray3Emg3 = [];

    const xArray4Emg4 = [];
    const yArray4Emg4 = [];

    const gsrSignalLocalX = [];
    const gsrSignalLocalY = [];

    const acelerometroInclXSignalLocalX = [];
    const acelerometroInclXSignalLocalY = [];
    const acelerometroInclYSignalLocalX = [];
    const acelerometroInclYSignalLocalY = [];
    const acelerometroInclZSignalLocalX = [];
    const acelerometroInclZSignalLocalY = [];

    const frecuenciaSignalLocalX = [];
    const frecuenciaSignalLocalY = [];

    const temperaturaSignalLocalX = [];
    const temperaturaSignalLocalY = [];

      if (sensoresSelected >= 1) {
        for (let i = 0; i < emg1.length; i += 1) {
          xArrayEmg1.push(emg1[i].x);
          yArrayEmg1.push(emg1[i].y);
        }
      }
    
      if (sensoresSelected >= 2) {
        for (let i = 0; i < emg2.length; i += 1) {
          xArray2Emg2.push(emg2[i].x);
          yArray2Emg2.push(emg2[i].y);
        }
      }
      if (sensoresSelected >= 3) {
        for (let i = 0; i < emg3.length; i += 1) {
          xArray3Emg3.push(emg3[i].x);
          yArray3Emg3.push(emg3[i].y);
        }
      }
      if (sensoresSelected >= 4) {
        for (let i = 0; i < emg4.length; i += 1) {
          xArray4Emg4.push(emg4[i].x);
          yArray4Emg4.push(emg4[i].y);
        }
      }

    
      if (gsrChecked) {
        for (let i = 0; i < GSR.length; i += 1) {
          gsrSignalLocalX.push(GSR[i].x);
          gsrSignalLocalY.push(GSR[i].y);
        }
      }
      if (acelerometroChecked) {
        for (let i = 0; i < INCLX.length; i += 1) {
          acelerometroInclXSignalLocalX.push(INCLX[i].x);
          acelerometroInclXSignalLocalY.push(INCLX[i].y);
        }
        for (let i = 0; i < INCLY.length; i += 1) {
          acelerometroInclYSignalLocalX.push(INCLY[i].x);
          acelerometroInclYSignalLocalY.push(INCLY[i].y);
        }
        for (let i = 0; i < INCLZ.length; i += 1) {
          acelerometroInclZSignalLocalX.push(INCLZ[i].x);
          acelerometroInclZSignalLocalY.push(INCLZ[i].y);
        }
      }
      if (frecuenciaChecked) {
        for (let i = 0; i < HRLM.length; i += 1) {
          frecuenciaSignalLocalX.push(HRLM[i].x);
          frecuenciaSignalLocalY.push(HRLM[i].y);
        }
      }
      if (temperaturaChecked) {
        for (let i = 0; i < TC.length; i += 1) {
          temperaturaSignalLocalX.push(TC[i].x);
          temperaturaSignalLocalY.push(TC[i].y);
        }
      }
    if (sensoresSelected >= 1) {
      setDataXEmg1(xArrayEmg1);
      setDataYEmg1(yArrayEmg1);
    }

    if (sensoresSelected >= 2) {
      setDataX2Emg2(xArray2Emg2);
      setDataY2Emg2(yArray2Emg2);
    }

    if (sensoresSelected >= 3) {
      setDataX3Emg3(xArray3Emg3);
      setDataY3Emg3(yArray3Emg3);
    }
    if (sensoresSelected >= 4) {
      setDataX4Emg4(xArray4Emg4);
      setDataY4Emg4(yArray4Emg4);
    }

    if (gsrChecked) {
      setGsrDataX(gsrSignalLocalX);
      setGsrDataY(gsrSignalLocalY);
    }
    if (acelerometroChecked) {
      console.log("DATOS ACELEROMETRO", acelerometroInclXDataX, acelerometroInclXDataY)
      setAcelerometroInclXDataX(acelerometroInclXSignalLocalX);
      setAcelerometroInclXDataY(acelerometroInclXSignalLocalY);

      setAcelerometroInclYDataX(acelerometroInclYSignalLocalX);
      setAcelerometroInclYDataY(acelerometroInclYSignalLocalY);

      setAcelerometroInclZDataX(acelerometroInclZSignalLocalX);
      setAcelerometroInclZDataY(acelerometroInclZSignalLocalY);
    }
    if (frecuenciaChecked) {
      setFrecuenciaDataX(frecuenciaSignalLocalX);
      setFrecuenciaDataY(frecuenciaSignalLocalY);
    }

    if (temperaturaChecked) {
      console.log("DATOS TEMP", temperaturaDataX, temperaturaDataY)

      setTemperaturaDataX(temperaturaSignalLocalX);
      setTemperaturaDataY(temperaturaSignalLocalY);
    }
    setSignalRetrieved(true);
  };

  const numOfPlots = () => {
    const dataAux: any = [];
    if (sensoresSelected >= 1) {
      dataAux.push(trace1);
    }

    if (sensoresSelected >= 2) {
      dataAux.push(trace2);
    }

    if (sensoresSelected >= 3) {
      dataAux.push(trace3);
    }
    if (sensoresSelected >= 4) {
      dataAux.push(trace4);
    }
    if (gsrChecked) {
      dataAux.push(trace5);
    }
    if (frecuenciaChecked) {
      dataAux.push(trace6);
    }
    if (temperaturaChecked) {
      dataAux.push(trace7);
    }
    if (acelerometroChecked) {
      dataAux.push(trace8);
      dataAux.push(trace9);
      dataAux.push(trace10);

    }
    // setDataReady(dataArr);
    // impar aumenta las columns
    let dynamicRows = 0;
    let dynamicColumns = 0;

    if (totalSensores === 1) {
      dynamicRows = 1;
      dynamicColumns = 1;
    }
    if (totalSensores === 2) {
      dynamicRows = 1;
      dynamicColumns = 2;
    }
    if (totalSensores > 2 && totalSensores < 5) {
      dynamicRows = 2;
      dynamicColumns = 2;
    }
    if (totalSensores > 4 && totalSensores < 7) {
      dynamicRows = 2;
      dynamicColumns = 3;
    }
    if (totalSensores >= 7) {
      dynamicRows = 2;
      dynamicColumns = 4;
    }
    if (totalSensores >= 9) {
      dynamicRows = 2;
      dynamicColumns = 5;
    }
    const objGrid = {
      rows: dynamicRows,
      columns: dynamicColumns,
      pattern: 'independent',
    };
    // setIsDataReady(true);

    setData(dataAux);
    setIsDataReady(true);
    setGrid(objGrid);
  };

  useEffect(() => {
    appDispatch(setIsLoading(true));
    numOfPlots();
    // const [gridLayoutAux, dataAux] = numOfPlots();
    // setGrid(gridLayoutAux);
    appDispatch(setIsLoading(false));
  }, [signalRetrieved]);
  useEffect(() => {
    appDispatch(setIsLoading(true));

    retrieveSignal();
    // const [gridLayoutAux, dataAux] = numOfPlots();
    // setGrid(gridLayoutAux);
    appDispatch(setIsLoading(false));
  }, []);

  const onClickCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // navigate('/escogerConfiguracion');
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const dataR = Object.fromEntries(new FormData(form).entries());
    if (dataR.etiqueta === '') {
      setOpen(!open);
    } else {
      const objCopy = { ...objetoMongo };
      const etiquetaLocal = dataR.etiqueta as string;
      objCopy.etiqueta = etiquetaLocal;
      // For new records, if you want to rewrite a previous one comment these 3 lines
      const nombreCompleto = `${datosPaciente[0].col1} ${datosPaciente[0].col2} ${datosPaciente[0].col3}`;
      objCopy.name = nombreCompleto;
      objCopy.protocol = protocolo;


      // objCopy.name = "Marissa Lòpez Zaldivar";
      // objCopy.protocol = "Protocolo modular 11 nov";


      appDispatch(setMongoInsertObject(objCopy));
      const jsonDocument = JSON.stringify(objCopy);
      appDispatch(setIsLoading(true));
      // console.log("JSON TO BE SEND", jsonDocument);
      // const response = await fetch(`${apiEndpoint}/insertarElementoMongo`, {
      //   method: 'POST',
      //   body: jsonDocument,
      //   headers: {'Content-Type': 'application/json'}
      // });
      // if(response.status === 200) {
      //   const respBody = await response.json();
      //   console.log("JSON", respBody);
      //   appDispatch(setIsLoading(false));
      //   appDispatch(setIsUploaded(true));
      //    navigate('/verPaciente');  
      // }
      // else if(response.status === 500) {
      //   const respBody = await response.json();
      //   console.log("JSON", respBody);
      //   appDispatch(setFailUpload(true));
      //   appDispatch(setIsLoading(false));
      // }
      console.log("COPY", objCopy)
      window.electron.ipcRenderer.insertarElementoMongo(jsonDocument);
      // navigate('/verPaciente');
    }
  };

  window.electron.ipcRenderer.insertarElementoM((event: any, resp: any) => {
    if (resp[0] === 0) {
      appDispatch(setFailUpload(true));
      appDispatch(setIsLoading(false));
    } else {
      appDispatch(setIsLoading(false));
      appDispatch(setIsUploaded(true));
      navigate('/verPaciente');
    }
  });

  if (isDataReady === false) {
    return <div />;
  }
  console.log("DATA", data);
  console.log("ARR", grid)
  return (
    <div>
      <Resultados
        onClickBack={onClickBack}
        dataArr={data}
        gridLayout={grid}
        onClickCrear={onClickCrear}
        emgDataAdquirida={emgDataAdquirida}
        arduinoDataAdquirida={arduinoDataAdquirida}
        sensoresSelected={sensoresSelected}
      />
      {open && (
        <SaveEtiquetaModal
          toggleModalGuardar={toggleModalGuardar}
          open={open}
          objMongo={objetoMongo}
        />
      )}
    </div>
  );
};

export default ResultadosContainer;
