// // frontend/src/components/Navigation/Navigation.jsx
// // added below for phase 3 of frontend readme
// import { NavLink } from 'react-router-dom';
// // changed below to remove the logout logic for phase 3 of frontend readme
// // import { useSelector, useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// // removed below to remove the logout logic for phase 3 of frontend readme
// // import * as sessionActions from '../../store/session';
// //
// // added below for phase 4 of frontend readme
// // removed below for phase 5 of frontend readme
// // import OpenModalButton from '../OpenModalButton';
// // import LoginFormModal from '../LoginFormModal';
// //
// //
// // added below for phase 4 of frontend readme
// // removed below for phase 5 of frontend readme
// // import SignupFormModal from '../SignupFormModal';
// //
// //
// // added below for phase 3 of frontend readme */
// // ...
// import './Navigation.css';
// // ...
// //

// function Navigation({ isLoaded }) {
//   // changed below for phase 4 of frontend readme
//   // const sessionUser = useSelector(state => state.session.user);
//   // changed below for phase 5 of frontend readme
//   // const sessionUser = useSelector((state) => state.session.user);
//   const sessionUser = useSelector(state => state.session.user);
//   //
//   //
//   // removed below to remove the logout logic for phase 3 of frontend readme
//   //   const dispatch = useDispatch();

//   //   const logout = (e) => {
//   //     e.preventDefault();
//   //     dispatch(sessionActions.logout());
//   //   };
//   //

//   // changed below for phase 4 of frontend readme
//   // const sessionLinks = sessionUser ? (
//   // removed below for phase 5 of frontend readme
//   // let sessionLinks;
//   // if (sessionUser) {
//   //   sessionLinks = (
//   //     //
//   //     // removed below for phase 4 of frontend readme
//   //     // <>
//   //     //
//   //     <li>
//   //       <ProfileButton user={sessionUser} />
//   //     </li>
//   //     // added below for phase 4 of frontend readme
//   //   );
//   // } else {
//   //   sessionLinks = (
//   //     //
//   //     // removed below to remove the logout logic for phase 3 of frontend readme */}
//   //     //  <li>
//   //     // <button onClick={logout}>Log Out</button>
//   //     // </li> */}
//   //     //
//   //     //  removed below for phase 4 of frontend readme */}
//   //     //  </> */}
//   //     //
//   //     // removed below for phase 4 of frontend readme
//   //     // ) : (
//   //     //
//   //     <>
//   //       <li>
//   //         {/* added below for phase 4 of frontend readme */}
//   //         <OpenModalButton
//   //           buttonText="Log In"
//   //           modalComponent={<LoginFormModal />}
//   //         />
//   //       </li>
//   //       {/*  */}
//   //       {/* removed below for phase 4 of frontend readme */}
//   //       {/* //  <NavLink to="/login">Log In</NavLink> */}
//   //       {/* // </li> */}
//   //       {/* //  */}
//   //       <li>
//   //         {/* changed below for phase 4 of frontend readme */}
//   //         {/* <NavLink to="/signup">Sign Up</NavLink> */}
//   //         <OpenModalButton
//   //           buttonText="Sign Up"
//   //           modalComponent={<SignupFormModal />}
//   //         />
//   //         {/*  */}
//   //       </li>
//   //     </>
//   //   );
//   //   // added below for phase 4 of frontend readme
//   // }
//   // //
//   //

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {/* changed below for phase 5 of frontend readme */}
//       {/* {isLoaded && sessionLinks} */}
//       {isLoaded && (
//         //
//         // added below for phase 5 of frontend readme
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//       {/*  */}
//     </ul>
//   );
// }

// export default Navigation;
// {/* //  */ }
// import { Link } from 'react-router-dom';

// const Navigation = ({ user, onLogout }) => {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       {user ? (
//         <>
//           <button onClick={onLogout}>Log Out</button>
//           <Link to="/spots/current">Manage Spots</Link>
//           <button>Create a New Spot</button>
//         </>
//       ) : (
//         <Link to="/login">Log In</Link>
//       )}
//     </nav>
//   );
// };

// export default Navigation;
// frontend/src/components/Navigation/Navigation.jsx


////////////////////////////////////////
// COMMENTED OUT BELOW TO TEST PHASE 3:

// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">airBnB</NavLink>
//       </li>
//       {isLoaded && sessionUser && (
//         <>
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//         <li>
//           <NavLink to="/spots/new">Create a New Spot</NavLink>
//         </li>
//       </>
//       )}
//     </ul>
//   );
// }
// export default Navigation;

////////////////////////////////////////


import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// removed useDispatch and sessionActions imports for phase4
// import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// removed modal imports in phase 5:
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;


// // removed below in phase 5 - showing login/signup buttons in profile button
// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);
//   // removed below from phase4
//   // const dispatch = useDispatch();
//   // const logout = (e) => {
//   //   e.preventDefault();
//   //   dispatch(sessionActions.logout());
//   // };
//   const sessionLinks = sessionUser ? (
//     <>
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//       {/* <li>
//         <button onClick={logout}>Log Out</button>
//       </li> */}
//     </>
//   ) : (
//     <>
//       {/* added from phase 5 to always render profile button */}
//       <li>
//         {/* <ProfileButton /> */}
//       </li>
//       {/* Phase 5: remove the OpenModalButtons as you will be adding the triggers for opening the modals in the ProfileButton component instead */}
//       {/* <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//       </li>
//       <li>
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li> */}
//       { /* changed Nav links to modal (popup) buttons in phase 4
//       <li>
//         <NavLink to="/login">Log In</NavLink>
//       </li>
//       <li>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li> */}
//     </>
//   );

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;
