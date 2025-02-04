// frontend/src/App.jsx
// added below for phase 1 of frontend readme
// added below for phase 1 of frontend readme
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// changed below for phase 1 of frontend readme
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// changed below for phase 3 of frontend readme
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// 
// 
// removed below for phase 4 of frontend readme
// import LoginFormPage from './components/LoginFormPage';
// 
// added below for phase 2 of frontend readme
import SignupFormPage from './components/SignupFormPage';
// 
// added below for phase 3 of frontend readme
import Navigation from './components/Navigation';
// 
// added below for phase 1 of frontend readme
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
    {/* // added below for phase 3 of frontend readme */}
    <Navigation isLoaded={isLoaded} />
    {/*  */}
      {isLoaded && <Outlet />}
    </>
  );
}
// 

const router = createBrowserRouter([
  // added below for phase 1 of frontend readme
  {
    element: <Layout />,
    children: [
      // 
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: '/login',
        element: <LoginFormPage />
        // added below for phase 2 of frontend readme
        // }
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      }
      // 
      // added below for phase 1 of frontend readme
    ]
  }
  // 
]);
// 

function App() {
  // changed below for phase 1 of frontend readme
  // return <h1> Hello from App </h1>;
  return <RouterProvider router={router} />;
  // 
}

export default App;
