import { Dispatch } from 'redux';
import {
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  BundleStartAction,
  BundleCompleteAction,
  Direction,
  Action,
} from '../actions';
import { ActionType } from '../types';
import { CellTypes } from '../cell';
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

const bundleStart = (cellId: string): BundleStartAction => ({
  type: ActionType.BUNDLE_START,
  payload: {
    cellId,
  },
});

const bundleComplete = (
  cellId: string,
  bundle: { code: string; err: string }
): BundleCompleteAction => ({
  type: ActionType.BUNDLE_COMPLETE,
  payload: {
    cellId,
    bundle,
  },
});

export const createBundle =
  (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch(bundleStart(cellId));
    const res = await bundle(input);
    dispatch(bundleComplete(cellId, res));
  };
