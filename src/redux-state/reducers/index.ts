import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import srcDocHtmlReducer from './srcDocHtmlReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  srcDocHtml: srcDocHtmlReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
