import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

export interface IDatos {
  usuarioPaciente: string;
  datosPaciente: Cols[];
}

const initialState: IDatos = {
  usuarioPaciente: '',
  datosPaciente: [],
};

export const PacienteSlice = createSlice({
  name: 'datos',
  initialState,
  reducers: {
    setUsuarioPaciente: (
      state,
      action: PayloadAction<IDatos['usuarioPaciente']>
    ) => {
      state.usuarioPaciente = action.payload;
    },
    setDatosPaciente: (
      state,
      action: PayloadAction<IDatos['datosPaciente']>
    ) => {
      state.datosPaciente = action.payload;
    },
  },
});

export const { setUsuarioPaciente, setDatosPaciente } = PacienteSlice.actions;
export const selectUsuarioPaciente = (state: RootState) =>
  state.datos.usuarioPaciente;
export const selectDatosPaciente = (state: RootState) =>
  state.datos.datosPaciente;
export default PacienteSlice.reducer;
