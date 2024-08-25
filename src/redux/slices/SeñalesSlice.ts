/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MongoInsertObjectInterface,
  RealTimeSignalInterface,
} from 'renderer/components/Utilities/Constants';

export interface SignalObj {
  length: number;
  x: number;
  y: number;
}

export interface ISeñales {
  sensoresPrueba: number;
  signalsXGraph: Array<any>;
  signalsYGraph: Array<any>;
  ventanasArrayEmg1: Array<any>;
  ventanasArrayEmg2: Array<any>;
  ventanasArrayEmg3: Array<any>;
  ventanasArrayEmg4: Array<any>;
  ventanasArrayGsr: Array<any>;
  ventanasArrayAcelerometroX: Array<any>;
  ventanasArrayAcelerometroY: Array<any>;
  ventanasArrayAcelerometroZ: Array<any>;
  ventanasArrayTemperatura: Array<any>;
  ventanasArrayFrecuencia: Array<any>;
  cantidadSensores: number;
  cantidadSujetos: number;
  cantidadSujetosRespaldo: number;
  datosAnalisisIA: Array<any>;
  cleanAllSensors: boolean;
  gsrIsChecked: boolean;
  acelerometroIsChecked: boolean;
  frecuenciaIsChecked: boolean;
  temperaturaIsChecked: boolean;
  extraSensorsChecked: Array<boolean>;
  totalSensores: number;
  signalsToStore: object;
  mongoInsertObject: MongoInsertObjectInterface;
  viewObject: MongoInsertObjectInterface;
  dataArray: Array<any>;
  gridLayout: any;
  predictMode: boolean;
  realTimeSignal: any;
  emgDataAdquirida: any;
  arduinoDataAdquirida: any;
  regExSinAcelerometro: any;
}

const initialState: ISeñales = {
  sensoresPrueba: 0,
  signalsXGraph: [],
  signalsYGraph: [],
  ventanasArrayEmg1: [],
  ventanasArrayEmg2: [],
  ventanasArrayEmg3: [],
  ventanasArrayEmg4: [],
  ventanasArrayGsr: [],
  ventanasArrayAcelerometroX: [],
  ventanasArrayAcelerometroY: [],
  ventanasArrayAcelerometroZ: [],
  ventanasArrayTemperatura: [],
  ventanasArrayFrecuencia: [],
  cantidadSensores: 0,
  cantidadSujetos: 0,
  cantidadSujetosRespaldo: 0,
  datosAnalisisIA: [],
  cleanAllSensors: false,
  gsrIsChecked: false,
  acelerometroIsChecked: false,
  frecuenciaIsChecked: false,
  temperaturaIsChecked: false,
  extraSensorsChecked: [],
  totalSensores: 0,
  signalsToStore: {},
  mongoInsertObject: {
    name: '',
    protocol: '',
    signals: {},
    etiqueta: '',
  },
  viewObject: {
    name: '',
    protocol: '',
    signals: {},
    etiqueta: '',
  },
  dataArray: [],
  gridLayout: [],
  predictMode: false,
  realTimeSignal: {},
  emgDataAdquirida: {},
  arduinoDataAdquirida: {},
  regExSinAcelerometro: '',
};

export const SeñalesSlice = createSlice({
  name: 'señales',
  initialState,
  reducers: {
    setSensoresPrueba: (
      state,
      action: PayloadAction<ISeñales['sensoresPrueba']>
    ) => {
      state.sensoresPrueba = action.payload;
    },
    setSignalsXGraph: (
      state,
      action: PayloadAction<ISeñales['signalsXGraph']>
    ) => {
      state.signalsXGraph = action.payload;
    },
    setSignalsYGraph: (
      state,
      action: PayloadAction<ISeñales['signalsYGraph']>
    ) => {
      state.signalsYGraph = action.payload;
    },
    setVentanasArrayEmg1: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg1']>
    ) => {
      state.ventanasArrayEmg1 = action.payload;
    },
    setVentanasArrayEmg2: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg2']>
    ) => {
      state.ventanasArrayEmg2 = action.payload;
    },
    setVentanasArrayEmg3: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg3']>
    ) => {
      state.ventanasArrayEmg3 = action.payload;
    },
    setVentanasArrayEmg4: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayEmg4']>
    ) => {
      state.ventanasArrayEmg4 = action.payload;
    },
    setVentanasArrayGsr: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayGsr']>
    ) => {
      state.ventanasArrayGsr=action.payload;
    },
    setVentanasArrayAcelerometroX: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayAcelerometroX']>
    ) => {
      state.ventanasArrayAcelerometroX = action.payload;
    },
    setVentanasArrayAcelerometroY: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayAcelerometroY']>
    ) => {
      state.ventanasArrayAcelerometroY = action.payload;
    },
    setVentanasArrayAcelerometroZ: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayAcelerometroZ']>
    ) => {
      state.ventanasArrayAcelerometroZ = action.payload;
    },
    setVentanasArrayTemperatura: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayTemperatura']>
    ) => {
      state.ventanasArrayTemperatura = action.payload;
    },
    setVentanasArrayFrecuencia: (
      state,
      action: PayloadAction<ISeñales['ventanasArrayFrecuencia']>
    ) => {
      state.ventanasArrayFrecuencia = action.payload;
    },
    setCantidadSensores: (
      state,
      action: PayloadAction<ISeñales['cantidadSensores']>
    ) => {
      state.cantidadSensores = action.payload;
    },
    setCantidadSujetos: (
      state,
      action: PayloadAction<ISeñales['cantidadSujetos']>
    ) => {
      state.cantidadSujetos = action.payload;
    },
    setCantidadSujetosRespaldo: (
      state,
      action: PayloadAction<ISeñales['cantidadSujetosRespaldo']>
    ) => {
      state.cantidadSujetosRespaldo = action.payload;
    },
    setDatosAnalisisIA: (
      state,
      action: PayloadAction<ISeñales['datosAnalisisIA']>
    ) => {
      const copy = state.datosAnalisisIA;
      const newArray = [...copy, action.payload];
      state.datosAnalisisIA = newArray;
    },
    setCleanDatosAnalisisIA: (
      state,
      action: PayloadAction<ISeñales['datosAnalisisIA']>
    ) => {
      state.datosAnalisisIA = action.payload;
    },
    setCleanAllSensors: (
      state,
      action: PayloadAction<ISeñales['cleanAllSensors']>
    ) => {
      state.cleanAllSensors = action.payload;
      state.ventanasArrayEmg1 = [];
      state.ventanasArrayEmg2 = [];
      state.ventanasArrayEmg3 = [];
      state.ventanasArrayEmg4 = [];
      state.ventanasArrayGsr = [];
      state.ventanasArrayAcelerometroX = [];
      state.ventanasArrayAcelerometroY = [];
      state.ventanasArrayAcelerometroZ = [];
      state.ventanasArrayTemperatura = [];
      state.ventanasArrayFrecuencia = [];
      state.realTimeSignal = {};
    },
    setGsrIsChecked: (
      state,
      action: PayloadAction<ISeñales['gsrIsChecked']>
    ) => {
      state.gsrIsChecked = action.payload;
    },
    setAcelerometroIsChecked: (
      state,
      action: PayloadAction<ISeñales['acelerometroIsChecked']>
    ) => {
      state.acelerometroIsChecked = action.payload;
    },
    setFrecuenciaIsChecked: (
      state,
      action: PayloadAction<ISeñales['frecuenciaIsChecked']>
    ) => {
      state.frecuenciaIsChecked = action.payload;
    },
    setTemperaturaIsChecked: (
      state,
      action: PayloadAction<ISeñales['temperaturaIsChecked']>
    ) => {
      state.temperaturaIsChecked = action.payload;
    },
    setExtraSensorsChecked: (
      state,
      action: PayloadAction<ISeñales['extraSensorsChecked']>
    ) => {
      state.extraSensorsChecked = action.payload;
      console.log('this was payload', action.payload);
    },
    setTotalSensores: (
      state,
      action: PayloadAction<ISeñales['totalSensores']>
    ) => {
      state.totalSensores = action.payload;
    },
    setSignalsToStore: (
      state,
      action: PayloadAction<ISeñales['signalsToStore']>
    ) => {
      state.signalsToStore = action.payload;
    },
    setMongoInsertObject: (
      state,
      action: PayloadAction<ISeñales['mongoInsertObject']>
    ) => {
      state.mongoInsertObject = action.payload;
    },
    setViewObject: (
      state,
      action: PayloadAction<ISeñales['viewObject']>
    ) => {
      state.viewObject = action.payload;
    },
    setDataArray: (state, action: PayloadAction<ISeñales['dataArray']>) => {
      state.dataArray = action.payload;
    },
    setGridLayout: (state, action: PayloadAction<ISeñales['gridLayout']>) => {
      state.gridLayout = action.payload;
    },
    setPredictMode: (state, action: PayloadAction<ISeñales['predictMode']>) => {
      state.predictMode = action.payload;
    },
    setRealTimeSignal: (
      state,
      action: PayloadAction<ISeñales['realTimeSignal']>
    ) => {
      state.realTimeSignal = action.payload;
    },
    setEmgDataAdquirida: (state, action: PayloadAction<ISeñales['emgDataAdquirida']>) => {
      state.emgDataAdquirida = action.payload;
    },
    setArduinoDataAdquirida: (state, action: PayloadAction<ISeñales['arduinoDataAdquirida']>) => {
      state.arduinoDataAdquirida = action.payload;
    },
    setRegExSinAcelerometro: (state, action: PayloadAction<ISeñales['regExSinAcelerometro']>) => {
      state.regExSinAcelerometro = action.payload;
    },
  },
});

export const {
  setSensoresPrueba,
  setSignalsXGraph,
  setSignalsYGraph,
  setVentanasArrayEmg1,
  setVentanasArrayEmg2,
  setVentanasArrayEmg3,
  setVentanasArrayEmg4,
  setCantidadSensores,
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
  setVentanasArrayGsr,
  setVentanasArrayAcelerometroX,
  setVentanasArrayAcelerometroY,
  setVentanasArrayAcelerometroZ,
  setVentanasArrayTemperatura,
  setVentanasArrayFrecuencia,
  setDatosAnalisisIA,
  setCleanDatosAnalisisIA,
  setCleanAllSensors,
  setGsrIsChecked,
  setAcelerometroIsChecked,
  setFrecuenciaIsChecked,
  setTemperaturaIsChecked,
  setTotalSensores,
  setExtraSensorsChecked,
  setSignalsToStore,
  setMongoInsertObject,
  setDataArray,
  setGridLayout,
  setPredictMode,
  setRealTimeSignal,
  setEmgDataAdquirida,
  setArduinoDataAdquirida,
  setRegExSinAcelerometro,
  setViewObject,
} = SeñalesSlice.actions;
export default SeñalesSlice.reducer;
