import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface IStatus {
  isLogged: boolean;
  loggedUser: string;
  flagCreateDoctor: boolean;
  flagCredentials: boolean;
}

const initialState: IStatus = {
  isLogged: false,
  loggedUser: '',
  flagCreateDoctor: false,
  flagCredentials: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<IStatus['isLogged']>) => {
      state.isLogged = action.payload;
    },
    setLoggedUser: (state, action: PayloadAction<IStatus['loggedUser']>) => {
      state.loggedUser = action.payload;
    },
    setflagCreateDoctor: (state, action: PayloadAction<IStatus['flagCreateDoctor']>) => {
      state.flagCreateDoctor = action.payload;
    },
    setFlagCredentials: (state, action: PayloadAction<IStatus['flagCredentials']>) => {
      state.flagCredentials = action.payload;
    },
  },
});

export const { setIsLogged, setLoggedUser, setflagCreateDoctor, setFlagCredentials} = LoginSlice.actions;
export const selectIsLogged = (state: RootState) => state.login.isLogged;
export const selectLoggedUser = (state: RootState) => state.login.loggedUser;
export const selectFlagCreateDoctor = (state: RootState) => state.login.flagCreateDoctor;
export const selectFlagCredentials = (state: RootState) => state.login.flagCredentials;
export default LoginSlice.reducer;
