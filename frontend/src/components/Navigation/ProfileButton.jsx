// // frontend/src/components/Navigation/ProfileButton.jsx
// // added below for phase 3 of frontend readme
// // changed below for phase 3 of frontend readme
// // import { useState } from 'react';
// // changed below for phase 3 of frontend readme
// // import { useState, useEffect } from 'react';
// import { useState, useEffect, useRef } from 'react';
// // 
// // 
// import { useDispatch } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
// import * as sessionActions from '../../store/session';
// // added below for phase 5 of frontend readme
// // optional: changed below for phase 5 of frontend readme
// // import OpenModalButton from '../OpenModalButton';
// import OpenModalMenuItem from './OpenModalMenuItem';
// // 
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// // 

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   // added below for phase 3 of frontend readme
//   const [showMenu, setShowMenu] = useState(false);
//   // 
//   // changed below for phase 3 of frontend readme
//   const ulRef = useRef();
//   //   

//   // added below for phase 3 of frontend readme
//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
//     // if (!showMenu) setShowMenu(true);
//     setShowMenu(!showMenu);
//   };
//   // 

//   // added below for phase 3 of frontend readme
//   useEffect(() => {
//     // added below for phase 3 of frontend readme
//     if (!showMenu) return;
//     // 
//     // changed below for phase 3 of frontend readme
//     // const closeMenu = () => {
//         const closeMenu = (e) => {
//             // added below for phase 3 of frontend readme
//             // changed below for phase 5 of frontend readme
//             // if (ulRef.current && !ulRef.current.contains(e.target)) {
//               if (!ulRef.current.contains(e.target)) {
//             // 
//               // 
//         // 
//       setShowMenu(false);
//       // added below for phase 3 of frontend readme
//             }
//       //   
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener('click', closeMenu);
// // changed below for phase 3 of frontend readme
//     //   }, []);
// }, [showMenu]);
//     // 
//   //   

//   // optional: added below for phase 5 of frontend readme
//   const closeMenu = () => setShowMenu(false);
//   // 

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     // optional: added below for phase 5 of frontend readme
//     closeMenu();
//     // 
//   };

//   // added below for phase 3 of frontend readme
//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   //   

//   return (
//     <>
//     {/* changed below for phase 3 of frontend readme */}
//       {/* <button> */}
//       {/* changed below for phase 3 of frontend readme */}
//       {/* <button onClick={() => setShowMenu(!showMenu)}> */}
//       <button onClick={toggleMenu}>
//       {/*  */}
//       {/*  */}
//         <FaUserCircle />
//       </button>
//       {/* changed below for phase 3 of frontend readme */}
//       {/* <ul className="profile-dropdown"> */}
//       {/* changed below for phase 3 of frontend readme */}
//       {/* <ul className={ulClassName}> */}
//       <ul className={ulClassName} ref={ulRef}> {/* <-- Attach it here */}
//       {/*  */}
//       {/*  */}
//       {/* added below for phase 5 of frontend readme */}
//       {user ? (
//           <>
//         {/*  */}
//         <li>{user.username}</li>
//         <li>{user.firstName} {user.lastName}</li>
//         <li>{user.email}</li>
//         <li>
//           <button onClick={logout}>Log Out</button>
//         </li>
//         {/* added below for phase 5 of frontend readme */}
//         </>
//         ) : (
//           <>
//           {/* // optional: removed below for phase 5 of frontend readme */}
//             {/* <li> */}
//               {/*  */}
//               {/* optional: changed below for phase 5 of frontend readme */}
//               {/* <OpenModalButton
//                 buttonText="Log In" */}
//                 {/* // optional: added below for phase 5 of frontend readme */}
//                 {/* onButtonClick={closeMenu} */}
//                 {/*  */}
//                 <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               // 
//                 modalComponent={<LoginFormModal />}
//               />
//               {/* optional: removed below for phase 5 of frontend readme */}
//             {/* </li> */}
//             {/* <li> */}
//             {/*  */}
//             {/* optional: changed below for phase 5 of frontend readme */}
//               {/* <OpenModalButton
//                 buttonText="Sign Up" */}
//                 {/* // optional: added below for phase 5 of frontend readme */}
//                 {/* onButtonClick={closeMenu} */}
//                 {/* // */}
//                 <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//                 // 
//                 modalComponent={<SignupFormModal />}
//               />
//               {/* optional: removed below for phase 5 of frontend readme */}
//             {/* </li> */}
//             {/*  */}
//           </>
//         )}
//       {/*  */}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;
// // 
// frontend/src/components/Navigation/ProfileButton.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
import { useModal } from '../../context/Modal'; // Add this import for useModal
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import '../../styles/profileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { openModal } = useModal(); // Use the openModal function from the context

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={() => {
                  openModal(<LoginFormModal />); // Open LoginFormModal when clicked
                  closeMenu(); // Close the menu after the button is clicked
                }}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  openModal(<SignupFormModal />); // Open SignupFormModal when clicked
                  closeMenu(); // Close the menu after the button is clicked
                }}
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
