import produce from 'immer';

import { Action } from '../actions';
import { Cell } from '../cell';
import { ActionType } from '../types';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce((state: CellsState = initState, action: Action): CellsState => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = payload;
      state.data[id].content = content;
      break;
    }
    case ActionType.DELETE_CELL: {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== payload);
      break;
    }
    case ActionType.MOVE_CELL: {
      const { direction, id } = payload;
      const idx = state.order.findIndex((item) => item === id);
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx > state.order.length - 1) break;
      state.order[idx] = state.order[targetIdx];
      state.order[targetIdx] = id;
      break;
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type } = payload;
      const cell: Cell = {
        id: randomId(),
        type,
        content: '',
      };
      state.data[cell.id] = cell;
      const startIdx = state.order.findIndex((item) => item === id);
      if (startIdx < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(startIdx + 1, 0, cell.id);
      }
      break;
    }
    default:
      break;
  }
  return state;
}, initState);

const randomId = () => Math.random().toString(36).substr(2, 5);

export default cellsReducer;
