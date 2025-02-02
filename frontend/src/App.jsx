// frontend/src/App.jsx
// added below for phase 1 of frontend readme
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Welcome!</h1>
  },
  {
    path: '/login',
    element: <LoginFormPage />
  }
]);
// 

function App() {
  // changed below for phase 1 of frontend readme
  // return <h1> Hello from App </h1>;
  return <RouterProvider router={router} />;
  // 
}

export default App;
