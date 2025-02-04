// frontend/src/components/Navigation/Navigation.jsx
// added below for phase 3 of frontend readme
import { NavLink } from 'react-router-dom';
// changed below to remove the logout logic for phase 3 of frontend readme
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// removed below to remove the logout logic for phase 3 of frontend readme
// import * as sessionActions from '../../store/session';
// 
// added below for phase 4 of frontend readme
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
// 
// added below for phase 3 of frontend readme */
// ...
import './Navigation.css';
// ...
// 

function Navigation({ isLoaded }) {
  // changed below for phase 4 of frontend readme
  // const sessionUser = useSelector(state => state.session.user);
  const sessionUser = useSelector((state) => state.session.user);
  // 
  // removed below to remove the logout logic for phase 3 of frontend readme
  //   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };
// 

  const sessionLinks = sessionUser ? (
    // removed below for phase 4 of frontend readme
    // <>
    // 
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      // removed below to remove the logout logic for phase 3 of frontend readme */}
      //  <li>
        // <button onClick={logout}>Log Out</button>
      // </li> */}
      // 
      //  removed below for phase 4 of frontend readme */}
    //  </> */}
    // 
  ) : (
    <>
      <li>
      {/* added below for phase 4 of frontend readme */}
      <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
        {/*  */}
        {/* removed below for phase 4 of frontend readme */}
        {/* <NavLink to="/login">Log In</NavLink>
      </li> */}
      {/*  */}
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
{/* //  */}