import produce from 'immer';
import { ActionType } from '../types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initState: BundlesState = {};

const bundlesReducer = produce((state: BundlesState = initState, action: Action): BundlesState => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.BUNDLE_START:
      state[payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      };
      break;
    case ActionType.BUNDLE_COMPLETE:
      state[payload.cellId] = {
        loading: false,
        code: payload.bundle.code,
        err: payload.bundle.err,
      };
      break;
    default:
      break;
  }
  return state;
}, initState);

export default bundlesReducer;
