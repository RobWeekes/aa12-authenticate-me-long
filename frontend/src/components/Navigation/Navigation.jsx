// frontend/src/components/Navigation/Navigation.jsx
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul className="navigation">
//       <li>
//         <NavLink to="/">airbnb</NavLink>
//       </li>
      
//       {isLoaded && (
//         <>
//           {/* Only show Create a New Spot link if user is logged in */}
//           {sessionUser && (
//             <li>
//               <NavLink to="/spots/new">Create a New Spot</NavLink>
//             </li>
//           )}
//           <li>
//             <ProfileButton user={sessionUser} />
//           </li>
//         </>
//       )}
//     </ul>
//   );
// }

// export default Navigation;





// frontend/src/components/Navigation/Navigation.jsx
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';
// import { FaAirbnb } from 'react-icons/fa'; // Import Airbnb icon from react-icons

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul className="navigation">
//       <li className="logo-container">
//         <NavLink to="/">
//           <FaAirbnb className="airbnb-logo" />
//           <span>airbnb</span>
//         </NavLink>
//       </li>
//       {isLoaded && (
//         <>
//           {/* Only show Create a New Spot link if user is logged in */}
//           {sessionUser && (
//             // <li>
//             <li className="create-spot-link">
//               <NavLink to="/spots/new">Create a New Spot</NavLink>
//             </li>
//           )}
//           <li>
//             <ProfileButton user={sessionUser} />
//           </li>
//         </>
//       )}
//     </ul>
//   );
// }

// export default Navigation;





// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaAirbnb } from 'react-icons/fa'; // Import Airbnb icon from react-icons

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="navigation">
      <li className="logo-container">
        <NavLink to="/">
          <FaAirbnb className="airbnb-logo" />
          <span>airbnb</span>
        </NavLink>
      </li>
      {isLoaded && (
        <>
          {/* Only show Create a New Spot link if user is logged in */}
          {sessionUser && (
            <li className="create-spot-link">
              <NavLink 
                to="/spots/new"
                className={({ isActive }) => isActive ? "create-link-active" : ""}
              >
                Create a New Spot
              </NavLink>
            </li>
          )}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
