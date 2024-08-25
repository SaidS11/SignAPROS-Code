/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import {
  MultimediaObj,
  SelectedModeloIAInterface,
  SelectedPatientObj,
} from '../../renderer/components/Utilities/Constants';

export interface IStatus {
  configName: string;
  configDetalle: Object;
  configMultimedia: Array<MultimediaObj>;
  configPrimerPaso: Object;
  configCompleta: Object;
  protocoloDetalle: Object;
  protocoloNombre: string;
  analisisParams: Object;
  algoritmoIA: string;
  modeloDetalle: Object;
  selectedPatients: Array<SelectedPatientObj>;
  selectedModels: Array<SelectedModeloIAInterface>;
  duracionProtocolo: number;
}

const initialState: IStatus = {
  configName: '',
  configDetalle: {},
  configMultimedia: [
    {
      link_imagen: '',
      link_video: '',
    },
  ],
  configPrimerPaso: {},
  configCompleta: {},
  protocoloDetalle: {},
  protocoloNombre: '',
  analisisParams: {},
  algoritmoIA: '',
  modeloDetalle: {},
  selectedPatients: [
    {
      col1: '',
      col2: '',
    },
  ],
  selectedModels: [
    {
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: {},
    },
  ],
  duracionProtocolo: 0
};

export const ConfiguracionSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigName: (state, action: PayloadAction<IStatus['configName']>) => {
      state.configName = action.payload;
    },
    setConfigDetalle: (
      state,
      action: PayloadAction<IStatus['configDetalle']>
    ) => {
      state.configDetalle = action.payload;
    },
    setConfigMultimedia: (
      state,
      action: PayloadAction<IStatus['configMultimedia']>
    ) => {
      state.configMultimedia = action.payload;
    },
    setConfigPrimerPaso: (
      state,
      action: PayloadAction<IStatus['configPrimerPaso']>
    ) => {
      state.configPrimerPaso = action.payload;
    },
    setConfigCompleta: (
      state,
      action: PayloadAction<IStatus['configCompleta']>
    ) => {
      state.configCompleta = action.payload;
    },
    setProtocoloDetalle: (
      state,
      action: PayloadAction<IStatus['protocoloDetalle']>
    ) => {
      state.protocoloDetalle = action.payload;
    },
    setProtocoloNombre: (
      state,
      action: PayloadAction<IStatus['protocoloNombre']>
    ) => {
      state.protocoloNombre = action.payload;
    },
    setAnalisisParams: (
      state,
      action: PayloadAction<IStatus['analisisParams']>
    ) => {
      state.analisisParams = action.payload;
    },
    setAlgoritmoIA: (state, action: PayloadAction<IStatus['algoritmoIA']>) => {
      state.algoritmoIA = action.payload;
    },
    setModeloDetalle: (
      state,
      action: PayloadAction<IStatus['modeloDetalle']>
    ) => {
      state.modeloDetalle = action.payload;
    },
    setSelectedPatients: (
      state,
      action: PayloadAction<IStatus['selectedPatients']>
    ) => {
      state.selectedPatients = action.payload;
    },
    setSelectedModels: (
      state,
      action: PayloadAction<IStatus['selectedModels']>
    ) => {
      state.selectedModels = action.payload;
    },
    setDuracionProtocolo: (state, action: PayloadAction<IStatus['duracionProtocolo']>) => {
      state.duracionProtocolo = action.payload;
    },
  },
});

export const {
  setConfigName,
  setConfigDetalle,
  setConfigMultimedia,
  setConfigPrimerPaso,
  setConfigCompleta,
  setProtocoloDetalle,
  setProtocoloNombre,
  setAnalisisParams,
  setAlgoritmoIA,
  setModeloDetalle,
  setSelectedPatients,
  setSelectedModels,
  setDuracionProtocolo,
} = ConfiguracionSlice.actions;
export const selectConfigName = (state: RootState) => state.config.configName;
export const selectConfigDetalle = (state: RootState) =>
  state.config.configDetalle;
export const selectConfigMultimedia = (state: RootState) =>
  state.config.configMultimedia;
export const selectConfigPrimerPaso = (state: RootState) =>
  state.config.configPrimerPaso;
export const selectConfigCompleta = (state: RootState) =>
  state.config.configCompleta;
export const selectProtocoloDetalle = (state: RootState) =>
  state.config.protocoloDetalle;
export const selectProtocoloNombre = (state: RootState) =>
  state.config.protocoloNombre;
export const selectAnalisisParams = (state: RootState) =>
  state.config.analisisParams;
export default ConfiguracionSlice.reducer;
