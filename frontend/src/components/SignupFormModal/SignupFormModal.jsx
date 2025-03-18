// frontend/src/components/SignupFormModal/SignupFormModal.jsx
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






// // frontend/src/components/SignupFormModal/SignupFormModal.jsx
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       return setErrors({
//         confirmPassword: "Confirm Password field must be the same as the Password field"
//       });
//     }
    
//     setErrors({});
    
//     try {
//       const userData = {
//         email,
//         username,
//         firstName,
//         lastName,
//         password
//       };
      
//       const result = await dispatch(sessionActions.signup(userData));
//       closeModal();
//       return result;
//     } catch (error) {
//       // Handle the error properly
//       if (error.status >= 400) {
//         // If it's a response object
//         try {
//           const errorData = await error.json();
//           setErrors(errorData.errors || {});
//         } catch (jsonError) {
//           // If error.json() fails
//           setErrors({ 
//             server: "An error occurred during signup. Please try again." 
//           });
//         }
//       } else {
//         // If it's not a response object but has errors property
//         if (error.errors) {
//           setErrors(error.errors);
//         } else {
//           setErrors({ 
//             server: "An error occurred during signup. Please try again." 
//           });
//         }
//       }
//     }
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
//         {errors.email && <p className="error">{errors.email}</p>}
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         {errors.username && <p className="error">{errors.username}</p>}
//         <label>
//           First Name
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.firstName && <p className="error">{errors.firstName}</p>}
//         <label>
//           Last Name
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.lastName && <p className="error">{errors.lastName}</p>}
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p className="error">{errors.password}</p>}
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.confirmPassword && (
//           <p className="error">{errors.confirmPassword}</p>
//         )}
//         {errors.server && (
//           <p className="error">{errors.server}</p>
//         )}
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormModal;



// // frontend/src/components/SignupFormModal/SignupFormModal.jsx
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     // Validate form
//     const validationErrors = {};
//     if (!email) validationErrors.email = 'Email is required';
//     if (!username) validationErrors.username = 'Username is required';
//     if (username && username.length < 4) validationErrors.username = 'Username must be at least 4 characters';
//     if (!firstName) validationErrors.firstName = 'First Name is required';
//     if (!lastName) validationErrors.lastName = 'Last Name is required';
//     if (!password) validationErrors.password = 'Password is required';
//     if (password && password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
//     if (password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Attempt to sign up
//       const result = await dispatch(sessionActions.signup({
//         email,
//         username,
//         firstName,
//         lastName,
//         password
//       }));
      
//       console.log('Signup successful:', result);
//       closeModal();
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       if (error.errors) {
//         setErrors(error.errors);
//       } else {
//         setErrors({ general: 'An error occurred during signup' });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit} className="signup-form">
//         {errors.general && <p className="error">{errors.general}</p>}
//         {errors.server && <p className="error">{errors.server}</p>}
        
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className={errors.email ? 'error-input' : ''}
//             required
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className={errors.username ? 'error-input' : ''}
//             required
//           />
//           {errors.username && <p className="error">{errors.username}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="First Name"
//             className={errors.firstName ? 'error-input' : ''}
//             required
//           />
//           {errors.firstName && <p className="error">{errors.firstName}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Last Name"
//             className={errors.lastName ? 'error-input' : ''}
//             required
//           />
//           {errors.lastName && <p className="error">{errors.lastName}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className={errors.password ? 'error-input' : ''}
//             required
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             id="confirmPassword"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm Password"
//             className={errors.confirmPassword ? 'error-input' : ''}
//             required
//           />
//           {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
//         </div>

//         <button
//           type="submit"
//           className="signup-button"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Signing Up...' : 'Sign Up'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignupFormModal;




// frontend/src/components/SignupFormModal/SignupFormModal.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    const validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!username) validationErrors.username = 'Username is required';
    if (username && username.length < 4) validationErrors.username = 'Username must be at least 4 characters';
    if (!firstName) validationErrors.firstName = 'First Name is required';
    if (!lastName) validationErrors.lastName = 'Last Name is required';
    if (!password) validationErrors.password = 'Password is required';
    if (password && password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Attempt to sign up
      const result = await dispatch(sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password
      }));
      
      console.log('Signup successful:', result);
      closeModal();
      
    } catch (error) {
      console.error('Signup error:', error);
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: 'An error occurred during signup' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {errors.general && <p className="error">{errors.general}</p>}
        {errors.server && <p className="error">{errors.server}</p>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={errors.email ? 'error-input' : ''}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={errors.username ? 'error-input' : ''}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className={errors.firstName ? 'error-input' : ''}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className={errors.lastName ? 'error-input' : ''}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={errors.password ? 'error-input' : ''}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className={errors.confirmPassword ? 'error-input' : ''}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="signup-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;

