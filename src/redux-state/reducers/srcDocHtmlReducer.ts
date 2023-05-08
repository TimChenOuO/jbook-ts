import produce from 'immer';
import { ActionType } from '../types';
import { Action } from '../actions';

interface srcDocHtmlState {
  srcDoc: string;
  loading: boolean;
}

const initState: srcDocHtmlState = {
  srcDoc: '',
  loading: false,
};

const srcDocHtmlReducer = produce(
  (state: srcDocHtmlState = initState, action: Action): srcDocHtmlState => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.SRCDOC_START:
        state.loading = true;
        break;
      case ActionType.SRCDOC_DONE:
        state = {
          srcDoc: payload,
          loading: false,
        };
        break;
      default:
        break;
    }
    return state;
  },
  initState
);

export default srcDocHtmlReducer;
