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
// import SignupFormPage from './components/SignupFormModal';
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
        // element: <LoginFormPage />
        element: <LoginFormModal />
      },
      {
        path: "/signup",
        // element: <SignupFormPage />
        element: <SignupFormModal />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      // The /spots/:spotId route might be matching incorrectly during initial load or route transitions. When the spotId parameter is undefined, it still tries to render SpotDetailsPage.
      // {
      //   path: '/spots/:spotId',
      //   element: <SpotDetailsPage />
      // },
      // Let's modify the route to be more specific. This regex pattern ensures the route only matches when spotId is a number, preventing undefined ID requests:
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      // The /spots/:spotId route might be catching the 'current' path. Let's reorder the routes to put more specific routes first: '/spots/current' before '/spots/:spotId(\\d+)'
      {
        path: '/spots/:spotId(\\d+)',  // Only match numeric IDs
        element: <SpotDetailsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
