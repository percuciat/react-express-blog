import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
} from '@reduxjs/toolkit';

import { TypeRootState, TypeAppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<TypeRootState, TypeAppDispatch>;

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<TypeRootState, TypeAppDispatch>;
