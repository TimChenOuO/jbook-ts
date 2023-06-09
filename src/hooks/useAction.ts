import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux-state';
import { useMemo } from 'react';

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch]);
};
