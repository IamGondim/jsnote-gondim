import { combineReducers } from 'redux';
import { bundlesReducer } from './bundlesReducer';
import { cellsReducer } from './cellsReducer';

export const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export type RootState = ReturnType<typeof reducers>;