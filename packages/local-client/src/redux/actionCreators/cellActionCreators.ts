import { ActionType } from '../actionTypes/';
import { DeleteCellAction, UpdateCellAction, InsertCellAfterAction, MoveCellAction, Action } from '../actions';
import { Cell, CellTypes, MoveCellDirections } from '../cell';
import { Dispatch } from 'react';
import axios from 'axios';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direction: MoveCellDirections): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    }
  }
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    }
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message
      })
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: { data, order } } = getState();

    const cells = order.map(id => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message
      });
    }
  };
};