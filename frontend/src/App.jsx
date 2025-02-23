import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import CreateSpotForm from './components/CreateSpotForm';
// import DeleteSpotModal from './components/DeleteSpotModal';
// import DeleteReviewModal from './components/DeleteReviewModal';
import ManageSpotsPage from './components/ManageSpotsPage';
import SpotDetailsPage from './components/SpotDetailsPage';
import UpdateSpotForm from './components/UpdateSpotForm';
// import LoginFormPage from './components/LoginFormModal';
import LoginFormModal from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormModal';
import SignupFormModal from './components/SignupFormModal';

import './styles/global.css';
import './styles/landingPage.css';
import './styles/spotDetails.css';
import './styles/forms.css';

import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        // element: <h1>Welcome!</h1>
        element: <LandingPage />
      },
      {
        path: '/login',
        // note: not instructed to change below for phase 4 of frontend readme
        // element: <LoginFormPage />
        element: <LoginFormModal />
        //
        // added below for phase 2 of frontend readme
        // }
      },
      {
        path: "/signup",
        // note: not instructed to change below for phase 4 of frontend readme
        element: <SignupFormPage />
        // element: <SignupFormModal />
        //
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
