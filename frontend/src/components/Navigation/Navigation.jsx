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
// added below for phase 3 of frontend readme */
// ...
import './Navigation.css';
// ...
// 

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
// removed below to remove the logout logic for phase 3 of frontend readme
  //   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };
// 

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      {/* // removed below to remove the logout logic for phase 3 of frontend readme */}
      {/* <li>
        <button onClick={logout}>Log Out</button>
      </li> */}
      {/*  */}
    </>
  ) : (
    <>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
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
// 