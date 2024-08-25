import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  ReactReduxContextValue,
} from 'react-redux';
import { createContext } from 'react';
import { RootState, CustomDispatch } from './store';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const customContext = createContext<ReactReduxContextValue>(
  {} as ReactReduxContextValue
);

// const useAppDispatch = createDispatchHook<RootState>(customContext);

// export const useCustomSelector: TypedUseSelectorHook<RootState> = createSelectorHook(customContext);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
// export const useCustomDispatch = () => useAppDispatch() as CustomDispatch;

export const useCustomDispatch: () => CustomDispatch = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
