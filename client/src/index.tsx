import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from './app/App';
/*import reportWebVitals from './reportWebVitals';*/
import GlobalStyles from 'app/styles/global';
import { HelmetProvider } from 'react-helmet-async';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store()}>
        <BrowserRouter>
          <App />
          <GlobalStyles />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*reportWebVitals();*/
