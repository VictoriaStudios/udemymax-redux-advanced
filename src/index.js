import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import reduxStore from './components/store/store'

ReactDOM.render(
  <React.StrictMode>
    {/* Redux store provider */}
    <Provider store={reduxStore}>
    {/* React context provider */}
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

