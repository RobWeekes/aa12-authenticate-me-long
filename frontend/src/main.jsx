// // frontend/src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // replaced above with below for phase 0 of frontend readme
// // import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// // added below for phase 0 of frontend readme
// import { Provider } from 'react-redux';
// import configureStore from './store/store';
// // added below for phase 0 of frontend readme
// import { restoreCSRF, csrfFetch } from './store/csrf';
// // added below for phase 1 of frontend readme
// import * as sessionActions from './store/session'; // <-- ADD THIS LINE
// // added below for phase 4 of frontend readme
// import { Modal, ModalProvider } from './context/Modal';
// // Create a variable to access your store & expose it on the window.
// // It should not be exposed in production; only set in development.

// const store = configureStore();
// // added below for phase 0 of frontend readme
// // originally in phase 0:
// // if (process.env.NODE_ENV !== 'production') {
// //   window.store = store;
// // }

// if (import.meta.env.MODE !== 'production') {
//   restoreCSRF();
//   // attach the custom csrfFetch function onto the window when in development
//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   // added below for phase 1 of frontend readme
//   window.sessionActions = sessionActions; // <-- ADD THIS LINE
// }

// // removed below for phase 4 of frontend readme
// // if (process.env.NODE_ENV !== 'production') {
// //   window.store = store;
// // }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* added below for phase 4 of frontend readme */}
//     <ModalProvider>
//       {/* // added below for phase 0 of frontend readme */}
//       <Provider store={store}>
//         <App />
//         {/* added below for phase 4 of frontend readme */}
//         <Modal />
//       </Provider>
//       {/* added below for phase 4 of frontend readme */}
//     </ModalProvider>
//   </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// // Import Redux-related stuff
// import { Provider } from 'react-redux';
// import configureStore from './store/store';

// // Import CSRF-related stuff
// import { restoreCSRF, csrfFetch } from './store/csrf';

// // Import session actions
// import * as sessionActions from './store/session';

// // Import Modal context and ModalProvider
// import { Modal, ModalProvider } from './context/Modal';

// // Create the Redux store
// const store = configureStore();

// // Development-only code
// if (import.meta.env.MODE !== 'production') {
//   restoreCSRF();
//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions;  // Expose session actions in dev mode
// }

// // // testing OpenModelButton component - Greeting button renders at bottom
// // import OpenModalButton from './components/OpenModalButton';
// // const Greeting = () => {
// //   return (
// //     <OpenModalButton
// //       buttonText="Greeting"
// //       modalComponent={<h2>Hello World!</h2>}
// //       onButtonClick={() => console.log("Greeting initiated")}
// //       onModalClose={() => console.log("Greeting completed")}
// //     />
// //   );
// // };

// // Render the root component
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* Wrap the app with ModalProvider and Redux Provider */}
//     <ModalProvider>
//       <Provider store={store}>
//         <App />
//         <Modal />
//         {/* <Greeting /> */}
//       </Provider>
//     </ModalProvider>
//   </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// // Import Redux-related stuff
// import { Provider } from 'react-redux';
// import configureStore from './store/store';

// // Import CSRF-related stuff
// import { restoreCSRF, csrfFetch } from './store/csrf';

// // Import session actions
// import * as sessionActions from './store/session';

// // Import Modal context and ModalProvider
// import { Modal, ModalProvider } from './context/Modal';

// // Create the Redux store
// const store = configureStore();

// // Initialize the application
// async function initializeApp() {
//   // In development mode, expose store and other utilities on window
//   if (import.meta.env.MODE !== 'production') {
//     // Restore CSRF token before exposing utilities
//     await restoreCSRF();
    
//     // Expose utilities on window for development
//     window.csrfFetch = csrfFetch;
//     window.store = store;
//     window.sessionActions = sessionActions;
//   }

//   // Render the root component
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <ModalProvider>
//         <Provider store={store}>
//           <App />
//           <Modal />
//         </Provider>
//       </ModalProvider>
//     </React.StrictMode>
//   );
// }

// // Start the application
// initializeApp();





// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// // Import Redux-related stuff
// import { Provider } from 'react-redux';
// import configureStore from './store/store';

// // Import CSRF-related stuff
// import { restoreCSRF, csrfFetch } from './store/csrf';

// // Import session actions
// import * as sessionActions from './store/session';

// // Import Modal context and ModalProvider
// import { Modal, ModalProvider } from './context/Modal';

// // Create the Redux store
// const store = configureStore();

// // Initialize the application
// async function initializeApp() {
//   try {
//     console.log('Initializing app...');
    
//     // In development mode, expose store and other utilities on window
//     if (import.meta.env.MODE !== 'production') {
//       // Restore CSRF token before exposing utilities
//       console.log('Restoring CSRF token...');
//       await restoreCSRF();
//       console.log('CSRF token restored');
      
//       // Expose utilities on window for development
//       window.csrfFetch = csrfFetch;
//       window.store = store;
//       window.sessionActions = sessionActions;
//     }

//     console.log('Rendering app...');
//     // Render the root component
//     ReactDOM.createRoot(document.getElementById('root')).render(
//       <React.StrictMode>
//         <ModalProvider>
//           <Provider store={store}>
//             <App />
//             <Modal />
//           </Provider>
//         </ModalProvider>
//       </React.StrictMode>
//     );
//   } catch (error) {
//     console.error('Error initializing app:', error);
//     // Display a user-friendly error message
//     document.getElementById('root').innerHTML = `
//       <div style="color: red; padding: 20px;">
//         <h2>Application Error</h2>
//         <p>There was a problem initializing the application. Please try refreshing the page.</p>
//         <p>Error details: ${error.message}</p>
//       </div>
//     `;
//   }
// }

// // Start the application
// initializeApp();

// // Add this to your initializeApp function
// try {
//   const testResponse = await fetch('/api/csrf/restore', {
//     credentials: 'include'
//   });
//   const testData = await testResponse.json();
//   console.log('Test CSRF fetch successful:', testData);
  
//   // Try a simple POST request
//   const testPostResponse = await fetch('/api/test-csrf', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'XSRF-Token': Cookies.get('XSRF-TOKEN')
//     },
//     credentials: 'include',
//     body: JSON.stringify({ test: 'data' })
//   });
//   console.log('Test POST request status:', testPostResponse.status);
// } catch (error) {
//   console.error('Test fetch failed:', error);
// }




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import Cookies from 'js-cookie'; // Add this import

// Import Redux-related stuff
import { Provider } from 'react-redux';
import configureStore from './store/store';

// Import CSRF-related stuff
import { restoreCSRF, csrfFetch } from './store/csrf';

// Import session actions
import * as sessionActions from './store/session';

// Import Modal context and ModalProvider
import { Modal, ModalProvider } from './context/Modal';

// Create the Redux store
const store = configureStore();

// Initialize the application
async function initializeApp() {
  try {
    console.log('Initializing app...');
    
    // In development mode, expose store and other utilities on window
    if (import.meta.env.MODE !== 'production') {
      // Restore CSRF token before exposing utilities
      console.log('Restoring CSRF token...');
      await restoreCSRF();
      console.log('CSRF token restored');
      
      // Expose utilities on window for development
      window.csrfFetch = csrfFetch;
      window.store = store;
      window.sessionActions = sessionActions;
    }

    console.log('Rendering app...');
    // Render the root component
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ModalProvider>
          <Provider store={store}>
            <App />
            <Modal />
          </Provider>
        </ModalProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error initializing app:', error);
    // Display a user-friendly error message
    document.getElementById('root').innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>Application Error</h2>
        <p>There was a problem initializing the application. Please try refreshing the page.</p>
        <p>Error details: ${error.message}</p>
      </div>
    `;
  }
}

// Start the application
initializeApp();
