import { useTypedSelector } from './useTypedSelector';
const showFunc = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  var show = (value) => {
    const root = document.querySelector('#root');
    if (typeof value === 'object') {
      if (value.$$typeof && value.props) {
        _ReactDOM.render(value, root);
      } else {
        root.innerHTML = JSON.stringify(value);
      }
    } else {
      root.innerHTML = value;
    };
  };
`;
const showFuncNoop = `var show = () => {};`;

const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(({ cells }) => {
    const { data, order } = cells;
    const cellDataByOrder = order.map((itemId) => data[itemId]);
    const cumulative = [];
    for (let c of cellDataByOrder) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulative.push(showFunc);
        } else {
          cumulative.push(showFuncNoop);
        }
        cumulative.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulative;
  }).join('\n');
};

export default useCumulativeCode;
