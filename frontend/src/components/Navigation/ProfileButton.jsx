// frontend/src/components/Navigation/ProfileButton.jsx
// added below for phase 3 of frontend readme
// changed below for phase 3 of frontend readme
// import { useState } from 'react';
// changed below for phase 3 of frontend readme
// import { useState, useEffect } from 'react';
import { useState, useEffect, useRef } from 'react';
// 
// 
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // added below for phase 3 of frontend readme
  const [showMenu, setShowMenu] = useState(false);
  // 
  // changed below for phase 3 of frontend readme
  const ulRef = useRef();
  //   

  // added below for phase 3 of frontend readme
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };
  // 

  // added below for phase 3 of frontend readme
  useEffect(() => {
    // added below for phase 3 of frontend readme
    if (!showMenu) return;
    // 
    // changed below for phase 3 of frontend readme
    // const closeMenu = () => {
        const closeMenu = (e) => {
            // added below for phase 3 of frontend readme
            if (ulRef.current && !ulRef.current.contains(e.target)) {
            // 
        // 
      setShowMenu(false);
      // added below for phase 3 of frontend readme
            }
      //   
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
// changed below for phase 3 of frontend readme
    //   }, []);
}, [showMenu]);
    // 
  //   

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // added below for phase 3 of frontend readme
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  //   

  return (
    <>
    {/* changed below for phase 3 of frontend readme */}
      {/* <button> */}
      {/* changed below for phase 3 of frontend readme */}
      {/* <button onClick={() => setShowMenu(!showMenu)}> */}
      <button onClick={toggleMenu}>
      {/*  */}
      {/*  */}
        <FaUserCircle />
      </button>
      {/* changed below for phase 3 of frontend readme */}
      {/* <ul className="profile-dropdown"> */}
      {/* changed below for phase 3 of frontend readme */}
      {/* <ul className={ulClassName}> */}
      <ul className={ulClassName} ref={ulRef}> {/* <-- Attach it here */}
      {/*  */}
      {/*  */}
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
// 