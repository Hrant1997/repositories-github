import ReactDOM from 'react-dom/client'
import store from './redux/store';
import './index.css'
import { Provider } from 'react-redux';
import Router from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />
  </Provider>,
);
