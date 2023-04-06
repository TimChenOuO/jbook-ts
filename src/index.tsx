import { createRoot } from 'react-dom/client';

import CodeCell from "./component/CodeCell";

const App = () => {

  return <div>
    <CodeCell />
  </div>
}

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />)
// ReactDOM.render(<App />, container);

