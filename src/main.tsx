import './index.css';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from '@/redux/sotre.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
