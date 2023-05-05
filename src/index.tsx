import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux-state';

// import TextEditor from './component/TextEditor';
import CellList from './component/CellList';

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  )
}

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />)
// ReactDOM.render(<App />, container);

