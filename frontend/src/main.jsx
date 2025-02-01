// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// replaced above with below for phase 0 of frontend readme
// import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// added below for phase 0 of frontend readme
import { Provider } from 'react-redux';
import configureStore from './store';
// added below for phase 0 of frontend readme
// ... other imports
import { restoreCSRF, csrfFetch } from './store/csrf';
// 

const store = configureStore();
// added below for phase 0 of frontend readme
// ... const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}
// 

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}
// 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
{/* // added below for phase 0 of frontend readme */}
<Provider store={store}>
  {/*  */}
    <App />
    {/*  */}
    </Provider>
    {/*  */}
  </React.StrictMode>
);
