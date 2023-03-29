import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {App} from './components/app/app';
import store from './components/services/store';
import './index.css';
// import { compose, configureStore } from 'redux';
// const enhancer = composeEnhancers();

// const store = configureStore(reducer, enhancer); 



const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
root.render(
  <React.StrictMode>
   <Provider store = {store}>
      <App />
   </Provider>
  </React.StrictMode>
);

