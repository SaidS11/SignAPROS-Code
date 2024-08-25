/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import PlotP from './PlotP';
import { PlotSelectionEvent, Shape } from 'plotly.js';
import './Caracterizar.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setVentanasArrayEmg1,
  setVentanasArrayEmg2,
  setVentanasArrayEmg3,
  setVentanasArrayEmg4,
  setVentanasArrayGsr,
  setVentanasArrayAcelerometroX,
  setVentanasArrayAcelerometroY,
  setVentanasArrayAcelerometroZ,
  setVentanasArrayTemperatura,
  setCantidadSujetos,
  setVentanasArrayFrecuencia,
} from '../../../redux/slices/SeñalesSlice';
import {
  setErrorDetails,
  setFallosAlCargar,
  setIsLoading,
  setSignalsIteration,
} from '../../../redux/slices/StatusSlice';
import styleButton, {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import { DataSignalsMongo, adqWithTimeAndSignals as adqSignals } from '../Utilities/Constants';
import { equivalenteSegunPosiciones, obtenerPosicionesEnRango } from '../Login/LoginContainer';

export type PlotSelectionState = PlotSelectionEvent & {
  selections?: Partial<Shape>[];
};

interface CaracterizarProps {
  sensoresSelected: any;
  selectedPatients: any;
  selectedProtocol: any;
  currentIteration: any;
  gsrChecked: boolean;
  frecuenciaChecked: boolean;
  acelerometroChecked: boolean;
  temperaturaChecked: boolean
  respuesta: any;
  splits: number;
}

const Caracterizar = (props: CaracterizarProps) => {
  const {
    sensoresSelected,
    selectedPatients,
    selectedProtocol,
    currentIteration,
    gsrChecked,
    frecuenciaChecked,
    acelerometroChecked,
    temperaturaChecked,
    respuesta,
    splits,
  } = props;

  const [selectionClick, setSelectionClick] = useState(false);
  const [startingPoint, setStartingPoint] = useState(0);
  const [startingIndex, setStartingIndex] = useState(0);


  const [colors1, setColors1] = useState(['gray']);
  const [colors2, setColors2] = useState(['blue']);
  const [colors3, setColors3] = useState(['skyblue']);
  const [colors4, setColors4] = useState(['cyan']);

  const [ventanasSeñal1Emg1, setVentanasSeñal1Emg1] = useState<any>([]);
  const [ventanasSeñal2Emg2, setVentanasSeñal2Emg2] = useState<any>([]);
  const [ventanasSeñal3Emg3, setVentanasSeñal3Emg3] = useState<any>([]);
  const [ventanasSeñal4Emg4, setVentanasSeñal4Emg4] = useState<any>([]);
  

  const [gsrDataX, setGsrDataX] = useState([0]);
  const [gsrDataY, setGsrDataY] = useState([0]);
  const [timeDataGSR, setTimeDataGSR] = useState([""]);

  const [ventanasSeñalGsr, setVentanasSeñalGsr] = useState<any>(
    []
  );

  const [acelerometroDataDeXEjeX, setAcelerometroDataDeXEjeX] = useState([0]);
  const [acelerometroDataDeXEjeY, setAcelerometroDataDeXEjeY] = useState([0]);
  const [timeDataACE, setTimeDataACE] = useState([""]);

  const [ventanasSeñalAcelerometroDeX, setVentanasSeñalAcelerometroDeX] =
    useState<any>([]);

  const [acelerometroDataDeYEjeX, setAcelerometroDataDeYEjeX] = useState([0]);
  const [acelerometroDataDeYEjeY, setAcelerometroDataDeYEjeY] = useState([0]);
  const [ventanasSeñalAcelerometroDeY, setVentanasSeñalAcelerometroDeY] =
    useState<any>([]);

  const [acelerometroDataDeZEjeX, setAcelerometroDataDeZEjeX] = useState([0]);
  const [acelerometroDataDeZEjeY, setAcelerometroDataDeZEjeY] = useState([0]);
  const [ventanasSeñalAcelerometroDeZ, setVentanasSeñalAcelerometroDeZ] =
    useState<any>([]);

  const [frecuenciaDataX, setFrecuenciaDataX] = useState([0]);
  const [frecuenciaDataY, setFrecuenciaDataY] = useState([0]);
  const [timeDataHRLM, setTimeDataHRLM] = useState([""]);

  const [ventanasSeñalFrecuencia, setVentanasSeñalFrecuencia] = useState<any>(
    []
  );

  const [temperaturaDataX, setTemperaturaDataX] = useState([0]);
  const [temperaturaDataY, setTemperaturaDataY] = useState([0]);
  const [timeDataTC, setTimeDataTC] = useState([""]);

  const [ventanasSeñalTemperatura, setVentanasSeñalTemperatura] = useState<any>(
    []
  );

  const sujetos = useCustomSelector((state) => state.señales.cantidadSujetos);
  const ventanaReduxEmg1 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg1
  );
  const ventanaReduxEmg2 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg2
  );
  const ventanaReduxEmg3 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg3
  );
  const ventanaReduxEmg4 = useCustomSelector(
    (state) => state.señales.ventanasArrayEmg4
  );
  const ventanaReduxGsr = useCustomSelector(
    (state) => state.señales.ventanasArrayGsr
  );
  const ventanaReduxAcelerometroX = useCustomSelector(
    (state) => state.señales.ventanasArrayAcelerometroX
  );

  const ventanaReduxAcelerometroY = useCustomSelector(
    (state) => state.señales.ventanasArrayAcelerometroY
  );

  const ventanaReduxAcelerometroZ = useCustomSelector(
    (state) => state.señales.ventanasArrayAcelerometroZ
  );

  const ventanaReduxTemperatura = useCustomSelector(
    (state) => state.señales.ventanasArrayTemperatura
  );


  const ventanaReduxFrecuencia = useCustomSelector(
    (state) => state.señales.ventanasArrayFrecuencia
  );

  const [currentMaxWindows, setCurrentMaxWindows] = useState(0);

  const navigate = useNavigate();
  // const [curSelected, setCurSelected] = useState(false);
  const appDispatch = useCustomDispatch();
  // const [color1, setColor1] = useState("red")
  const [timeDataEmg, setTimeDataEmg] = useState([""]);



  const [dataXEmg1, setDataXEmg1] = useState([0]);
  const [dataYEmg1, setDataYEmg1] = useState([0]);
  const trace1 = {
    x: dataXEmg1,
    y: dataYEmg1,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    line: { color: 'gray' },
    marker: { color: colors1 },
    // mode: 'markers+lines',
    // mode: 'markers',
    // mode: 'lines',

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
    // mode:'markers',
    line: { color: 'blue' },
    // With each click a push to the colors array must be added to keep adding colors
    marker: { color: colors2 },
    // mode: 'markers+lines',
    // mode: 'lines',

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
    line: { color: 'skyblue' },
    marker: { color: colors3 },
    // mode: 'markers+lines',
    // mode: 'lines',

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
    line: { color: 'cyan' },
    marker: { color: colors4 },
    // mode: 'markers+lines',

    name: 'EMG4',
  };

  // const trace5 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x5',
  //   yaxis: 'y5',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG12',
  // };

  // const trace6 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x6',
  //   yaxis: 'y6',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG13',
  // };
  // const trace7 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x7',
  //   yaxis: 'y7',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG14',
  // };
  // const trace8 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x8',
  //   yaxis: 'y8',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG15',
  // };


  // const trace9 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x9',
  //   yaxis: 'y9',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG12',
  // };

  // const trace10 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x10',
  //   yaxis: 'y10',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG13',
  // };
  // const trace11 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x11',
  //   yaxis: 'y11',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG14',
  // };
  // const trace12 = {
  //   x: dataXEmg1,
  //   y: dataYEmg1,
  //   xaxis: 'x12',
  //   yaxis: 'y12',
  //   type: 'scatter',
  //   line: { color: 'gray' },
  //   marker: { color: colors1 },
  //   mode: 'markers+lines',
  //   // mode: 'markers',
  //   name: 'EMG15',
  // };

  const [dataX5, setDataX5] = useState([0]);
  const [dataY5, setDataY5] = useState([0]);
  const trace5 = {
    x: dataX5,
    y: dataY5,
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter',
  };

  const [dataX6, setDataX6] = useState([0]);
  const [dataY6, setDataY6] = useState([0]);
  const trace6 = {
    x: dataX6,
    y: dataY6,
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter',
  };

  const [dataX7, setDataX7] = useState([0]);
  const [dataY7, setDataY7] = useState([0]);
  const trace7 = {
    x: dataX7,
    y: dataY7,
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter',
  };

  const [dataX8, setDataX8] = useState([0]);
  const [dataY8, setDataY8] = useState([0]);
  const trace8 = {
    x: dataX8,
    y: dataY8,
    xaxis: 'x8',
    yaxis: 'y8',
    type: 'scatter',
  };

  const dataArr = [
    trace1,
    trace2,
    trace3,
    trace4,
    trace5,
    trace6,
    trace7,
    trace8,
    // trace9,
    // trace10,
    // trace11,
    // trace12,

  ];

  let numY = 0;
  let numX = 0;
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

    // const respuesta =
    //   (await buscarElementoMongoFront()) as Array<DataSignalsMongo>;
    
    console.log("SIGNAL", respuesta);
    let adqWithTimeAndSignals = adqSignals;

    const hasKey = Object.keys(respuesta[0].signals).some(x => x === "GSR");
    if(hasKey) {
      console.log("IT HAS");
      adqWithTimeAndSignals = respuesta[0]
      if(adqWithTimeAndSignals.signals.emg1.length > 100000) {
        console.log("Reverted");
        // adqWithTimeAndSignals = adqSignals;
      }
      if(adqWithTimeAndSignals.signals.emg1.length > 6000) {
        console.log("Too Many Samples");
        // adqWithTimeAndSignals.signals.emg1 = adqWithTimeAndSignals.signals.emg1.slice(0, 5000);
        // adqWithTimeAndSignals.signals.emg2 = adqWithTimeAndSignals.signals.emg2.slice(0, 5000);
        // adqWithTimeAndSignals.signals.emg3 = adqWithTimeAndSignals.signals.emg3.slice(0, 5000);
        // adqWithTimeAndSignals.signals.emg4 = adqWithTimeAndSignals.signals.emg4.slice(0, 5000);

      }
    }
    
    console.log("VAR DATA", adqWithTimeAndSignals);


    // const { emg1 } = respuesta[0].signals;
    // const { emg2 } = respuesta[0].signals;
    // const { emg3 } = respuesta[0].signals;
    // const { emg4 } = respuesta[0].signals;

    // const { GSR } = respuesta[0].signals;
    // const { TC } = respuesta[0].signals;
    // const { HRLM } = respuesta[0].signals;
    
    // const { INCLX } = respuesta[0].signals;
    // const { INCLY } = respuesta[0].signals;
    // const { INCLZ } = respuesta[0].signals;

    const { emg1 } = adqWithTimeAndSignals.signals;
    const { emg2 } = adqWithTimeAndSignals.signals;
    const { emg3 } = adqWithTimeAndSignals.signals;
    const { emg4 } = adqWithTimeAndSignals.signals;

    const { GSR } = adqWithTimeAndSignals.signals;
    const { TC } = adqWithTimeAndSignals.signals;
    const { HRLM } = adqWithTimeAndSignals.signals;
    
    const { INCLX } = adqWithTimeAndSignals.signals;
    const { INCLY } = adqWithTimeAndSignals.signals;
    const { INCLZ } = adqWithTimeAndSignals.signals;

    // TIMES 
    const { tiempoEmg } = adqWithTimeAndSignals.signals;
    const { tiempoGSR } = adqWithTimeAndSignals.signals;
    const { tiempoTC } = adqWithTimeAndSignals.signals;
    const { tiempoHRLM } = adqWithTimeAndSignals.signals;
    const { tiempoINCLX } = adqWithTimeAndSignals.signals;
    const { tiempoINCLY } = adqWithTimeAndSignals.signals;
    const { tiempoINCLZ } = adqWithTimeAndSignals.signals;




    // console.log("TEST OBJ", adqWithTimeAndSignals.signals);

    const xArrayEmg1 = [];
    const yArrayEmg1 = [];

    const xArray2Emg2 = [];
    const yArray2Emg2 = [];

    const xArray3Emg3 = [];
    const yArray3Emg3 = [];

    const xArray4Emg4 = [];
    const yArray4Emg4 = [];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const colors2 = [];

    const gsrSignalLocalX = [];
    const gsrSignalLocalY = [];

    const acelerometroSignalLocalDeXEjeX = [];
    const acelerometroSignalLocalDeXEjeY = [];

    const acelerometroSignalLocalDeYEjeX = [];
    const acelerometroSignalLocalDeYEjeY = [];

    const acelerometroSignalLocalDeZEjeX = [];
    const acelerometroSignalLocalDeZEjeY = [];

    const frecuenciaSignalLocalX = [];
    const frecuenciaSignalLocalY = [];

    const temperaturaSignalLocalX = [];
    const temperaturaSignalLocalY = [];

      if (sensoresSelected >= 1) {
        for (let i = 0; i < emg1.length; i += 1) {
          xArrayEmg1.push(emg1[i].x);
          yArrayEmg1.push(emg1[i].y);
          colors1.push('gray');
        }

      }
      if (sensoresSelected >= 2) {
        for (let i = 0; i < emg2.length; i += 1) {
          xArray2Emg2.push(emg2[i].x);
          yArray2Emg2.push(emg2[i].y);
          colors2.push('blue');
        }

      }
      if (sensoresSelected >= 3) {
        for (let i = 0; i < emg3.length; i += 1) {
          xArray3Emg3.push(emg3[i].x);
          yArray3Emg3.push(emg3[i].y);
          colors3.push('skyblue');
        }
      }
      if (sensoresSelected >= 4) {
        for (let i = 0; i < emg4.length; i += 1) {
          xArray4Emg4.push(emg4[i].x);
          yArray4Emg4.push(emg4[i].y);
          colors4.push('cyan');
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
          acelerometroSignalLocalDeXEjeX.push(INCLX[i].x);
          acelerometroSignalLocalDeXEjeY.push(INCLX[i].y);
  
          acelerometroSignalLocalDeYEjeX.push(INCLY[i].x);
          acelerometroSignalLocalDeYEjeY.push(INCLY[i].y);
  
          acelerometroSignalLocalDeZEjeX.push(INCLZ[i].x);
          acelerometroSignalLocalDeZEjeY.push(INCLZ[i].y);
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
      setTimeDataEmg(tiempoEmg);
    }

    if (sensoresSelected >= 2) {
      setDataX2Emg2(xArray2Emg2);
      setDataY2Emg2(yArray2Emg2);
      setColors2(colors2);
    }

    if (sensoresSelected >= 3) {
      setDataX3Emg3(xArray3Emg3);
      setDataY3Emg3(yArray3Emg3);
      setColors3(colors3);
    }
    if (sensoresSelected >= 4) {
      setDataX4Emg4(xArray4Emg4);
      setDataY4Emg4(yArray4Emg4);
      setColors4(colors4);
    }

    if (gsrChecked) {
      setTimeDataGSR(tiempoGSR);
      setGsrDataX(gsrSignalLocalX);
      setGsrDataY(gsrSignalLocalY);
    }
    if (acelerometroChecked) {
      setTimeDataACE(tiempoINCLX);
      setAcelerometroDataDeXEjeX(acelerometroSignalLocalDeXEjeX);
      setAcelerometroDataDeXEjeY(acelerometroSignalLocalDeXEjeY);

      setAcelerometroDataDeYEjeX(acelerometroSignalLocalDeYEjeX);
      setAcelerometroDataDeYEjeY(acelerometroSignalLocalDeYEjeY);

      setAcelerometroDataDeZEjeX(acelerometroSignalLocalDeZEjeX);
      setAcelerometroDataDeZEjeY(acelerometroSignalLocalDeZEjeY);
    }
    if (frecuenciaChecked) {
      setTimeDataHRLM(tiempoHRLM);
      setFrecuenciaDataX(frecuenciaSignalLocalX);
      setFrecuenciaDataY(frecuenciaSignalLocalY);
    }
    if (temperaturaChecked) {
      setTimeDataTC(tiempoTC);
      setTemperaturaDataX(temperaturaSignalLocalX);
      setTemperaturaDataY(temperaturaSignalLocalY);

    }

    appDispatch(setIsLoading(false));

  };

  const numOfPlots = () => {
    const times = 8 - sensoresSelected;
    for (let i = 0; i < times; i += 1) {
      dataArr.pop();
    }
    // impar aumenta las columns
    let dynamicRows = 0;
    let dynamicColumns = 0;
    if (sensoresSelected === 1) {
      dynamicRows = 1;
      dynamicColumns = 1;
    }
    if (sensoresSelected === 2) {
      dynamicRows = 1;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 2 && sensoresSelected < 5) {
      dynamicRows = 2;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 4 && sensoresSelected < 7) {
      dynamicRows = 2;
      dynamicColumns = 3;
    }
    if (sensoresSelected >= 7) {
      dynamicRows = 2;
      dynamicColumns = 4;
    }
    if (sensoresSelected >= 9) {
      dynamicRows = 2;
      dynamicColumns = 5;
    }
    // const objGrid = {
    //   rows: dynamicRows,
    //   columns: dynamicColumns,
    //   pattern: 'independent',
    // };

    const objGrid = {
      rows: 4,
      columns: 1,
      pattern: 'independent',
    };
    return objGrid;
  };



  let selection: any[] = [];
  let selectedEmg = '';
  const [selectedLength, setSelectedLength] = useState(0);
  const [lastEMG, setLastEMG] = useState('');
  const gridLayout = numOfPlots();
  console.log("GRID", gridLayout);
  console.log("DATARR", dataArr);

  function crearArregloConsecutivo(posicionInicial: number, posicionFinal: number): number[] {
    const arregloResultante: number[] = [];
    for (let i = posicionInicial; i <= posicionFinal; i++) {
      arregloResultante.push(i);
    }
    return arregloResultante;
  }


  const [allSelections, setAllSelections] = useState<PlotSelectionState[]>([]);
  const storeSelections = (segment: { points: any[] }) => {
    console.log("Starting selection", segment.points.length);
    console.log("Selected", segment);

    if (segment.points.length > 0) {
      setAllSelections((curr) => {
        console.log(...curr);
        return [...curr, segment]});
      selectedEmg = segment.points[0].fullData.name;
      setLastEMG(selectedEmg);
      const helperArr: any[] = [];
      segment.points.map((ele: { pointNumber: any }) =>
        helperArr.push(ele.pointNumber)
      );
      selection = [...helperArr];
      onClickSelect();
    }
  };

  const clickSelection = (segment: { points: any[], selections: any }) => {
    console.log("Click on", segment);
    if (segment.points.length > 0) {
      setSelectionClick(true);
      selectedEmg = segment.points[0].fullData.name;
      setLastEMG(selectedEmg);
      setStartingPoint(segment.points[0].x);
      setStartingIndex(segment.points[0].pointNumber)
      console.log("Last EMG", lastEMG);
      console.log("Current EMG", selectedEmg);


      if (selectionClick && lastEMG === selectedEmg) {
          console.log("Inside of", lastEMG);
          const max = segment.points[0].fullData.y.reduce((acc: number, curr: number) => Math.max(acc, curr), Number.MIN_VALUE);
          const min = segment.points[0].fullData.y.reduce((acc: number, curr: number) => Math.min(acc, curr), Number.MAX_VALUE);
          segment.selections = [
            {
              line: {
                color: undefined,
                width: 1,
                dash: 'dot'
              },
              opacity: undefined,
              type: 'rect',
              x0: startingPoint,
              x1: segment.points[0].x,
              xref: segment.points[0].data.xaxis,
              y0: max,
              y1: min,
              yref: segment.points[0].data.yaxis
            }
    
          ]
          setAllSelections((curr) => {
            console.log(...curr);
            return [...curr, segment]});
          
          setSelectionClick(false);
          const arregloResultante = crearArregloConsecutivo(startingIndex, segment.points[0].pointNumber);
          
          console.log("Ventana resultante", arregloResultante);
          
          // const helperArr: any[] = [];
          // segment.points.map((ele: { pointNumber: any }) =>
          //   helperArr.push(ele.pointNumber)
          // );
          selection = [...arregloResultante];
          onClickSelect();
        }
      }
  };


  const onClickSelect = () => {
    console.log("On click select");

    if (selection.length > 0) {
    console.log("On click select 2", selection);

      try {
        // const colorsLocal1 = [...colors1];
        // const colorsLocal2 = [...colors2];
        // const colorsLocal3 = [...colors3];
        // const colorsLocal4 = [...colors4];

        const ventanasLocalEmg1 = [];
        const ventanasLocalEmg2 = [];
        const ventanasLocalEmg3 = [];
        const ventanasLocalEmg4 = [];

        const ventanasGsrLocal: { x: number[]; y: number[]; }[] = [];
        const ventanasFrecuenciaLocal = [];
        const ventanasTemperaturaLocal = [];

        const ventanasAcelerometroLocalX = [];
        const ventanasAcelerometroLocalY = [];
        const ventanasAcelerometroLocalZ = [];



        setSelectedLength(selection.length);
        const primerIndice = selection[0];
        const ultimoIndice = selection[selection.length -1]
        const tiempoInicial = timeDataEmg[primerIndice];
        const tiempoFinal = timeDataEmg[ultimoIndice];

        // const posicionesEnRango = obtenerPosicionesEnRango(timeDataGSR, timeDataEmg[primerIndice], timeDataEmg[ultimoIndice]);
        for (let i = 0; i < dataX2Emg2.length; i += 1) {
          if (i === selection[0]) {

            if (selectedEmg === 'EMG1') {
              ventanasLocalEmg1.push({ x: dataXEmg1[i], y: dataYEmg1[i] });
              // colorsLocal1[i] = 'red';

            } else if (selectedEmg === 'EMG2') {
              ventanasLocalEmg2.push({ x: dataX2Emg2[i], y: dataY2Emg2[i] });
              // colorsLocal2[i] = 'red';
            } else if (selectedEmg === 'EMG3') {
              ventanasLocalEmg3.push({ x: dataX3Emg3[i], y: dataY3Emg3[i] });
              // colorsLocal3[i] = 'red';
            } else if (selectedEmg === 'EMG4') {
              ventanasLocalEmg4.push({ x: dataX4Emg4[i], y: dataY4Emg4[i] });
              // colorsLocal4[i] = 'red';
            }
            selection.shift();
          }
          if (selection.length === 0) {
            break;
          }
        }
        console.log("PREV GSR", ventanasGsrLocal);
        if (gsrChecked) {
          const posicionesEnRango = obtenerPosicionesEnRango(timeDataGSR, tiempoInicial, tiempoFinal);
          const gsrRetorno = equivalenteSegunPosiciones(gsrDataX, gsrDataY, posicionesEnRango);

          ventanasGsrLocal.push(...gsrRetorno);
        }
        console.log("After GSR", ventanasGsrLocal);

        if (acelerometroChecked) {
          const posicionesEnRango = obtenerPosicionesEnRango(timeDataACE, tiempoInicial, tiempoFinal);
          const acelerometroRetornoX = equivalenteSegunPosiciones(acelerometroDataDeXEjeX, acelerometroDataDeXEjeY, posicionesEnRango);

          ventanasAcelerometroLocalX.push(...acelerometroRetornoX);

          const acelerometroRetornoYEjeX = equivalenteSegunPosiciones(acelerometroDataDeYEjeX, acelerometroDataDeYEjeY, posicionesEnRango);

          ventanasAcelerometroLocalY.push(...acelerometroRetornoYEjeX);

          const acelerometroRetornoZEjeX = equivalenteSegunPosiciones(acelerometroDataDeZEjeX, acelerometroDataDeZEjeY, posicionesEnRango);

          ventanasAcelerometroLocalZ.push(...acelerometroRetornoZEjeX);
        }
        if (frecuenciaChecked) {
          const posicionesEnRango = obtenerPosicionesEnRango(timeDataHRLM, tiempoInicial, tiempoFinal);
          const frecuenciaRetornoX = equivalenteSegunPosiciones(frecuenciaDataX, frecuenciaDataY, posicionesEnRango);

          ventanasFrecuenciaLocal.push(...frecuenciaRetornoX);
        }

        if (temperaturaChecked) {
          const posicionesEnRango = obtenerPosicionesEnRango(timeDataTC, tiempoInicial, tiempoFinal);
          const temperaturaRetornoX = equivalenteSegunPosiciones(frecuenciaDataX, frecuenciaDataY, posicionesEnRango);

          ventanasTemperaturaLocal.push(...temperaturaRetornoX);
        }
        // console.log("COLORS AFTER", colorsLocal1);

        console.log("VENTANA", ventanasLocalEmg1)
        selection.length = 0;
        if (selectedEmg === 'EMG1') {
          const localArray = [...ventanasSeñal1Emg1];
          localArray.push(ventanasLocalEmg1);
          setVentanasSeñal1Emg1(localArray);

          // setColors1([...colorsLocal1]);
        } else if (selectedEmg === 'EMG2') {
          const localArray = [...ventanasSeñal2Emg2];
          localArray.push(ventanasLocalEmg2);
          setVentanasSeñal2Emg2(localArray);
          // setColors2([...colorsLocal2]);
        } else if (selectedEmg === 'EMG3') {
          const localArray = [...ventanasSeñal3Emg3];
          localArray.push(ventanasLocalEmg3);
          setVentanasSeñal3Emg3(localArray);
          // setColors3([...colorsLocal3]);
        } else if (selectedEmg === 'EMG4') {
          const localArray = [...ventanasSeñal4Emg4];
          localArray.push(ventanasLocalEmg4);
          setVentanasSeñal4Emg4(localArray);
          // setColors4([...colorsLocal4]);
        }
        // Contains con nombre de sensores
        if (gsrChecked) {
          const localArrayGsr = [...ventanasSeñalGsr];
          localArrayGsr.push(ventanasGsrLocal);
          setVentanasSeñalGsr(localArrayGsr);
        }
        if (acelerometroChecked) {
          const localArrayAcelerometroX = [...ventanasSeñalAcelerometroDeX];
          localArrayAcelerometroX.push(ventanasAcelerometroLocalX);
          setVentanasSeñalAcelerometroDeX(localArrayAcelerometroX);

          const localArrayAcelerometroY = [...ventanasSeñalAcelerometroDeY];
          localArrayAcelerometroY.push(ventanasAcelerometroLocalY);
          setVentanasSeñalAcelerometroDeY(localArrayAcelerometroY);

          const localArrayAcelerometroZ = [...ventanasSeñalAcelerometroDeZ];
          localArrayAcelerometroZ.push(ventanasAcelerometroLocalZ);
          setVentanasSeñalAcelerometroDeZ(localArrayAcelerometroZ);
        }
        if (frecuenciaChecked) {
          const localArrayFrecuencia = [...ventanasSeñalFrecuencia];
          localArrayFrecuencia.push(ventanasFrecuenciaLocal);
          setVentanasSeñalFrecuencia(localArrayFrecuencia);
        }

        if (temperaturaChecked) {
          const localArrayTemperatura = [...ventanasSeñalTemperatura];
          localArrayTemperatura.push(ventanasTemperaturaLocal);
          setVentanasSeñalTemperatura(localArrayTemperatura);
        }
      } catch (ex: any) {
        alert(`Error ${ex}`);
      }
    } else {
      alert('Seleccione una ventana valida primero');
      setAllSelections((curr) => curr.slice(0, -1));
    }
  };
  console.log("GSR ACTUAL", ventanasSeñalGsr);
  console.log("EMG ACTUAL", ventanasSeñal1Emg1);

  function filtrarArreglo(arreglo: any) {
    const resultado: any = [];
  
    arreglo.forEach((subarreglo: any) => {
      const subarregloFiltrado = subarreglo.filter((objeto: any) => {
        return !resultado.some((otroSubarreglo: any) => otroSubarreglo.some((otroObjeto: any) => otroObjeto.x === objeto.x));
      });
  
      resultado.push(subarregloFiltrado);
    });
    return resultado.filter((subarreglo: any) => subarreglo.length > 0);
  }

  const onClickSave = () => {
    // Comprobacion del numero de ventanas, todos los sensores tienen que tener las
    // Mismas ventanas
    if (
      ventanasSeñal1Emg1.length !== ventanasSeñal2Emg2.length ||
      ventanasSeñal2Emg2.length !== ventanasSeñal3Emg3.length ||
      ventanasSeñal3Emg3.length !== ventanasSeñal4Emg4.length
    ) {

      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('The amount of windows must be the same on all sensors'));
      return;
    }
    if (
      ventanasSeñal1Emg1.length === 0 ||
      ventanasSeñal2Emg2.length === 0 ||
      ventanasSeñal3Emg3.length === 0 ||
      ventanasSeñal4Emg4.length === 0
    ) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Select at least two windows per graph`));
      return;
    }

    if (
      ventanasSeñal1Emg1.length === 1
    ) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Select more than one window per sensor`));
      return;
    }

    const localArrayEmg1 = [];
    if (sensoresSelected >= 1) {
      ventanaReduxEmg1.map((e: any) => localArrayEmg1.push(e));
      localArrayEmg1.push(ventanasSeñal1Emg1);
    }

    const localArrayEmg2 = [];
    if (sensoresSelected >= 2) {
      ventanaReduxEmg2.map((e: any) => localArrayEmg2.push(e));
      localArrayEmg2.push(ventanasSeñal2Emg2);
    }

    const localArrayEmg3 = [];
    if (sensoresSelected >= 3) {
      ventanaReduxEmg3.map((e: any) => localArrayEmg3.push(e));
      localArrayEmg3.push(ventanasSeñal3Emg3);
    }

    const localArrayEmg4 = [];
    if (sensoresSelected >= 4) {
      ventanaReduxEmg4.map((e: any) => localArrayEmg4.push(e));
      localArrayEmg4.push(ventanasSeñal4Emg4);
    }

    const localArrayGsr: any = [];
    if (gsrChecked) {
      ventanaReduxGsr.map((e: any) => localArrayGsr.push(e));
      const unionGsr = filtrarArreglo(ventanasSeñalGsr);
      localArrayGsr.push(unionGsr);
    }

    const localArrayAcelerometroX = [];
    const localArrayAcelerometroY = [];
    const localArrayAcelerometroZ = [];
    if (acelerometroChecked) {
      ventanaReduxAcelerometroX.map((e) => localArrayAcelerometroX.push(e));
      const unionAcelX = filtrarArreglo(ventanasSeñalAcelerometroDeX);
      localArrayAcelerometroX.push(unionAcelX);
    
      ventanaReduxAcelerometroY.map((e) => localArrayAcelerometroY.push(e));
      const unionAcelY = filtrarArreglo(ventanasSeñalAcelerometroDeY);
      localArrayAcelerometroY.push(unionAcelY);

      ventanaReduxAcelerometroZ.map((e) => localArrayAcelerometroZ.push(e));
      const unionAcelZ = filtrarArreglo(ventanasSeñalAcelerometroDeZ);
      localArrayAcelerometroZ.push(unionAcelZ);
    }

    const localArrayFrecuencia = [];
    if (frecuenciaChecked) {
      ventanaReduxFrecuencia.map((e) => localArrayFrecuencia.push(e));
      const unionFrec = filtrarArreglo(ventanasSeñalFrecuencia);
      localArrayFrecuencia.push(unionFrec);
    }

    const localArrayTemperatura = [];
    if (temperaturaChecked) {
      ventanaReduxTemperatura.map((e) => localArrayTemperatura.push(e));
      const unionTemperatura = filtrarArreglo(ventanasSeñalTemperatura);
      localArrayTemperatura.push(unionTemperatura);
    }

    appDispatch(setVentanasArrayEmg1(localArrayEmg1));
    appDispatch(setVentanasArrayEmg2(localArrayEmg2));
    appDispatch(setVentanasArrayEmg3(localArrayEmg3));
    appDispatch(setVentanasArrayEmg4(localArrayEmg4));
    console.log("Iteracion", currentIteration);
    
    console.log("Comparado con", localArrayGsr);

    appDispatch(setVentanasArrayGsr(localArrayGsr));
    appDispatch(setVentanasArrayAcelerometroX(localArrayAcelerometroX));
    appDispatch(setVentanasArrayAcelerometroY(localArrayAcelerometroY));
    appDispatch(setVentanasArrayAcelerometroZ(localArrayAcelerometroZ));
    appDispatch(setVentanasArrayTemperatura(localArrayTemperatura));
    console.log("Comparado con Tempera", localArrayTemperatura);


    appDispatch(setVentanasArrayFrecuencia(localArrayFrecuencia));

    if (sujetos !== 1) {
      appDispatch(setCantidadSujetos(sujetos - 1));
      appDispatch(setIsLoading(true));
      appDispatch(setSignalsIteration(currentIteration + 1));
      navigate('/blank');
    } else {
      navigate('/caracterizar2');
    }
  };

  useEffect(() => {
    retrieveSignal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("SEÑAL EMG ACTUAL", ventanasSeñal1Emg1);
  console.log("SEÑAL Colores ACTUAL", colors1);


  const onClickUndo = () => {
    setAllSelections((curr) => curr.slice(0, -1));
    console.log("SEÑAL EMG PREVIA", ventanasSeñal1Emg1);
    console.log("SEÑAL Colores PREVIA", colors1);
    console.log("SELECTED LENGTH", selectedLength);
    if (lastEMG === 'EMG1') {
      setVentanasSeñal1Emg1((curr: any) => curr.slice(0, -1));
      // const cleanedColors = colors1.map((color: string) => {
      //   if (color === 'red') {
      //     return 'gray';
      //   }
      //   return color;
      // });
      // setColors1([...cleanedColors]);
    } else if (lastEMG === 'EMG2') {
      setVentanasSeñal2Emg2((curr: any) => curr.slice(0, -1));
      // const cleanedColors = colors2.map((color: string) => {
      //   if (color === 'red') {
      //     return 'blue';
      //   }
      //   return color;
      // });
      // setColors2([...cleanedColors]);
    } else if (lastEMG === 'EMG3') {
      setVentanasSeñal3Emg3((curr: any) => curr.slice(0, -1));
      // const cleanedColors = colors3.map((color: string) => {
      //   if (color === 'red') {
      //     return 'yellow';
      //   }
      //   return color;
      // });
      // setColors3([...cleanedColors]);
    } else if (lastEMG === 'EMG4') {
      setVentanasSeñal4Emg4((curr: any) => curr.slice(0, -1));
      // const cleanedColors = colors4.map((color: string) => {
      //   if (color === 'red') {
      //     return 'green';
      //   }
      //   return color;
      // });
      // setColors4([...cleanedColors]);
    }
    // Contains con nombre de sensores
    if (gsrChecked) {
      setVentanasSeñalGsr((curr: any) => curr.slice(0, -1));
    }
    if (acelerometroChecked) {
      setVentanasSeñalAcelerometroDeX((curr: any) => curr.slice(0, -1));
      setVentanasSeñalAcelerometroDeY((curr: any) => curr.slice(0, -1));
      setVentanasSeñalAcelerometroDeZ((curr: any) => curr.slice(0, -1));

    }
    if (temperaturaChecked) {
      setVentanasSeñalTemperatura((curr: any) => curr.slice(0, -1));
    }
    if (frecuenciaChecked) {
      setVentanasSeñalFrecuencia((curr: any) => curr.slice(0, -1));
    }
  };
  return (
    <div>
      <h3>Instructions:</h3>
      <section className="display-center">  
        Click the first point of the window, which is the start of the selection (it will not appear anything on the screen until you five a second click) the second click will be the end of the window
        You must select the same number of windows per graph.
        The selected areas will replicate on the rest of the sensors (GSR...) if they exist on the subject record.
      </section>
      <PlotP
        dataArr={dataArr}
        selectedPatients={selectedPatients}
        currentIteration={currentIteration}
        storeSelections={storeSelections}
        gridLayout={gridLayout}
        allSelections={allSelections}
        clickSelection={clickSelection}
      />
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        Press "Process Selection" to end windowing process and continue to the feature extraction.
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={onClickUndo}>
          Discard Last Window
        </Button>
      </section>
      <section className="display-center">
        <Button onClick={onClickSave} sx={styleButtonBiggerGreen}>
          Process Selection
        </Button>
      </section>
    </div>
  );
};

Caracterizar.propTypes = {
  sensoresSelected: PropTypes.number.isRequired,
  selectedPatients: PropTypes.array.isRequired,
  selectedProtocol: PropTypes.string.isRequired,
  currentIteration: PropTypes.number.isRequired,
  gsrChecked: PropTypes.bool.isRequired,
  frecuenciaChecked: PropTypes.bool.isRequired,
  acelerometroChecked: PropTypes.bool.isRequired,
};

export default Caracterizar;
