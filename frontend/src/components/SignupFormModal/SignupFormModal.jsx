// frontend/src/components/SignupFormPage/SignupFormPage.jsx
// added below for phase 2 of frontend readme
// import { useState } from 'react';
// // changed below for phase 4 of frontend readme
// // import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// // added below for phase 4 of frontend readme
// import { useModal } from '../../context/Modal';
// // removed below for phase 4 of frontend readme
// // import { Navigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// // added below for phase 2 of frontend readme
// import './SignupForm.css';
// // changed below for phase 4 of frontend readme
// // function SignupFormPage() {

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   // removed below for phase 4 of frontend readme
//   // const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   // added below for phase 4 of frontend readme
//   const { closeModal } = useModal();

//   // removed below for phase 4 of frontend readme
//   // if (sessionUser) return <Navigate to="/" replace={true} />;

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       if (password === confirmPassword) {
//           setErrors({});
//           return dispatch(
//               sessionActions.signup({
//                   email,
//                   username,
//                   firstName,
//                   lastName,
//                   password
//               })
//           )
//               // added below for phase 4 of frontend readme
//               .then(closeModal)
//               .catch(async (res) => {
//                   const data = await res.json();
//                   if (data?.errors) {
//                       setErrors(data.errors);
//                   }
//               });
//       }
//       return setErrors({
//           confirmPassword: "Confirm Password field must be the same as the Password field"
//       });
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         {errors.email && <p>{errors.email}</p>}
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         {errors.username && <p>{errors.username}</p>}
//         <label>
//           First Name
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.firstName && <p>{errors.firstName}</p>}
//         <label>
//           Last Name
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.lastName && <p>{errors.lastName}</p>}
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p>{errors.password}</p>}
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//           {/* // changed below for phase 4 of frontend readme */}
//           {errors.confirmPassword && (
//           <p>{errors.confirmPassword}</p>
//         )}
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }
// // // changed below for phase 4 of frontend readme
// // export default SignupFormPage;
// export default SignupFormModal;



// // // // changed below for phase 4 of frontend readme
// // // // export default SignupFormPage;
// // // export default SignupFormModal;
// // // //
// // // //
// // // frontend/src/components/SignupFormPage/SignupFormPage.jsx
// // // added below for phase 2 of frontend readme
// // import { useState } from 'react';
// // // changed below for phase 4 of frontend readme
// // // import { useDispatch, useSelector } from 'react-redux';
// // import { useDispatch } from 'react-redux';
// // //
// // // added below for phase 4 of frontend readme
// // import { useModal } from '../../context/Modal';
// // //
// // // removed below for phase 4 of frontend readme
// // // import { Navigate } from 'react-router-dom';
// // //
// // import * as sessionActions from '../../store/session';
// // // added below for phase 2 of frontend readme
// // // ...
// // import './SignupForm.css';
// // // ...
// // //

// // // changed below for phase 4 of frontend readme
// // // function SignupFormPage() {
// // function SignupFormModal() {
// //     //
// //     const dispatch = useDispatch();
// //     // removed below for phase 4 of frontend readme
// //     // const sessionUser = useSelector((state) => state.session.user);
// //     //
// //     const [email, setEmail] = useState("");
// //     const [username, setUsername] = useState("");
// //     const [firstName, setFirstName] = useState("");
// //     const [lastName, setLastName] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [confirmPassword, setConfirmPassword] = useState("");
// //     const [errors, setErrors] = useState({});
// //     // added below for phase 4 of frontend readme
// //     const { closeModal } = useModal();
// //     //

// //     // removed below for phase 4 of frontend readme
// //     // if (sessionUser) return <Navigate to="/" replace={true} />;
// //     //

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (password === confirmPassword) {
// //             setErrors({});
// //             return dispatch(
// //                 sessionActions.signup({
// //                     email,
// //                     username,
// //                     firstName,
// //                     lastName,
// //                     password
// //                 })
// //             )
// //                 // added below for phase 4 of frontend readme
// //                 .then(closeModal)
// //                 //
// //                 .catch(async (res) => {
// //                     const data = await res.json();
// //                     if (data?.errors) {
// //                         setErrors(data.errors);
// //                     }
// //                 });
// //         }
// //         return setErrors({
// //             confirmPassword: "Confirm Password field must be the same as the Password field"
// //         });
// //     };

// //     return (
// //         <>
// //             <h1>Sign Up</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <label>
// //                     Email
// //                     <input
// //                         type="text"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.email && <p>{errors.email}</p>}
// //                 <label>
// //                     Username
// //                     <input
// //                         type="text"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.username && <p>{errors.username}</p>}
// //                 <label>
// //                     First Name
// //                     <input
// //                         type="text"
// //                         value={firstName}
// //                         onChange={(e) => setFirstName(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.firstName && <p>{errors.firstName}</p>}
// //                 <label>
// //                     Last Name
// //                     <input
// //                         type="text"
// //                         value={lastName}
// //                         onChange={(e) => setLastName(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.lastName && <p>{errors.lastName}</p>}
// //                 <label>
// //                     Password
// //                     <input
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.password && <p>{errors.password}</p>}
// //                 <label>
// //                     Confirm Password
// //                     <input
// //                         type="password"
// //                         value={confirmPassword}
// //                         onChange={(e) => setConfirmPassword(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {/* // changed below for phase 4 of frontend readme */}
// //                 {/* {errors.confirmPassword &&  */}
// //                 {errors.confirmPassword && (
// //                     //
// //                     <p>{errors.confirmPassword}</p>
// //                     // changed below for phase 4 of frontend readme
// //                     // }
// //                 )}
// //                 {/* // */}
// //                 <button type="submit">Sign Up</button>
// //             </form>
// //         </>
// //     );
// // }

// // // changed below for phase 4 of frontend readme
// // export default SignupFormPage;
// // export default SignupFormModal;
// // //
// // //

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }
    
    setErrors({});
    
    try {
      const userData = {
        email,
        username,
        firstName,
        lastName,
        password
      };
      
      const result = await dispatch(sessionActions.signup(userData));
      closeModal();
      return result;
    } catch (error) {
      // Handle the error properly
      if (error.status >= 400) {
        // If it's a response object
        try {
          const errorData = await error.json();
          setErrors(errorData.errors || {});
        } catch (jsonError) {
          // If error.json() fails
          setErrors({ 
            server: "An error occurred during signup. Please try again." 
          });
        }
      } else {
        // If it's not a response object but has errors property
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setErrors({ 
            server: "An error occurred during signup. Please try again." 
          });
        }
      }
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        {errors.server && (
          <p className="error">{errors.server}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
