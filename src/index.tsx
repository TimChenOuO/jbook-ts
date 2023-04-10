import { createRoot } from 'react-dom/client';
import TextEditor from './component/TextEditor';
// import CodeCell from "./component/CodeCell";

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {

  return <div>
    {/* <CodeCell /> */}
    <TextEditor />
  </div>
}

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />)
// ReactDOM.render(<App />, container);

