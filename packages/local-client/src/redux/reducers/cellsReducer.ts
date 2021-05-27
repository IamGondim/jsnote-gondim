import produce from 'immer';
import { ActionType } from '../actionTypes';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  err: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  err: null,
  order: [],
  data: {},
};

export const cellsReducer = produce((state: CellsState, action: Action): CellsState => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.err = action.payload;

      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.err = null;

      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.loading = false;
      state.order = action.payload.map(cell => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);

      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.err = action.payload;

      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;

      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex(id => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      //if targetIndex outside boundaries of array, return
      if (targetIndex > state.order.length - 1 || targetIndex < 0) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(id => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    default:
      return state;
  }
}, initialState);

const randomId = (): string => {
  return Math.random().toString(36).substr(2, 5);
};