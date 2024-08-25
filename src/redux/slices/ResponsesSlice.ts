/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  pythonResponse: string;
}

const initialState: IStatus = {
  pythonResponse: '',
};

export const ResponsesSlice = createSlice({
  name: 'responses',
  initialState,
  reducers: {
    setPythonResponse: (
      state,
      action: PayloadAction<IStatus['pythonResponse']>
    ) => {
      state.pythonResponse = action.payload;
    },
  },
});

export const { setPythonResponse } = ResponsesSlice.actions;
export const selectPythonResponse = (state: RootState) =>
  state.responses.pythonResponse;
export default ResponsesSlice.reducer;
