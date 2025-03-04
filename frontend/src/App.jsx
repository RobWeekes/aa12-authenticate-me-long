import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';

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

function SpotErrorBoundary() {
  return (
    <div className="error-container">
      <h2>Spot Details Not Found</h2>
      <p>The spot you're looking for couldn't be loaded.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

// add the ErrorBoundary to the root route:
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <SpotErrorBoundary />,
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
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      // {
      //   path: '/spots/:spotId',
      //   element: <SpotDetailsPage />
      // },
      // The /spots/:spotId route might be matching incorrectly during initial load or route transitions. When the spotId parameter is undefined, it still tries to render SpotDetailsPage.
      // This regex pattern ensures the route only matches when spotId is a number, preventing undefined ID requests:
      {
        path: '/spots/:spotId(\\d+)',  // Only match numeric IDs
        element: <SpotDetailsPage />
      },
      // The 404 error is happening because we need to add an error boundary to handle route transitions gracefully.
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
