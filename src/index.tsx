import ReactDOM from 'react-dom/client';
import 'index.css';
import store from 'store/store';
import App from 'App';
import { Provider } from 'react-redux';
import './firebase'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
