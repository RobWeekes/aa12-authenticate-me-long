// // frontend/src/components/SignupFormPage/SignupFormPage.jsx
// // added below for phase 2 of frontend readme
// import { useState } from 'react';
// // changed below for phase 4 of frontend readme
// // import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// // 
// // added below for phase 4 of frontend readme
// import { useModal } from '../../context/Modal';
// // 
// // removed below for phase 4 of frontend readme
// // import { Navigate } from 'react-router-dom';
// // 
// import * as sessionActions from '../../store/session';
// // added below for phase 2 of frontend readme
// // ...
// import './SignupForm.css';
// // ...
// // 

// // changed below for phase 4 of frontend readme
// // function SignupFormPage() {
// function SignupFormModal() {
//     // 
//     const dispatch = useDispatch();
//     // removed below for phase 4 of frontend readme
//     // const sessionUser = useSelector((state) => state.session.user);
//     // 
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errors, setErrors] = useState({});
//     // added below for phase 4 of frontend readme
//     const { closeModal } = useModal();
//     // 

//     // removed below for phase 4 of frontend readme
//     // if (sessionUser) return <Navigate to="/" replace={true} />;
//     // 

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password === confirmPassword) {
//             setErrors({});
//             return dispatch(
//                 sessionActions.signup({
//                     email,
//                     username,
//                     firstName,
//                     lastName,
//                     password
//                 })
//             )
//                 // added below for phase 4 of frontend readme
//                 .then(closeModal)
//                 // 
//                 .catch(async (res) => {
//                     const data = await res.json();
//                     if (data?.errors) {
//                         setErrors(data.errors);
//                     }
//                 });
//         }
//         return setErrors({
//             confirmPassword: "Confirm Password field must be the same as the Password field"
//         });
//     };

//     return (
//         <>
//             <h1>Sign Up</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.email && <p>{errors.email}</p>}
//                 <label>
//                     Username
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.username && <p>{errors.username}</p>}
//                 <label>
//                     First Name
//                     <input
//                         type="text"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.firstName && <p>{errors.firstName}</p>}
//                 <label>
//                     Last Name
//                     <input
//                         type="text"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.lastName && <p>{errors.lastName}</p>}
//                 <label>
//                     Password
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.password && <p>{errors.password}</p>}
//                 <label>
//                     Confirm Password
//                     <input
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {/* // changed below for phase 4 of frontend readme */}
//                 {/* {errors.confirmPassword &&  */}
//                 {errors.confirmPassword && (
//                     // 
//                     <p>{errors.confirmPassword}</p>
//                     // changed below for phase 4 of frontend readme
//                     // }
//                 )}
//                 {/* // */}
//                 <button type="submit">Sign Up</button>
//             </form>
//         </>
//     );
// }

// // changed below for phase 4 of frontend readme
// // export default SignupFormPage;
// export default SignupFormModal;
// // 
// // 
import { useState } from 'react';

const SignupFormModal = ({ isOpen, onClose, onSignup }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    onSignup(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default SignupFormModal;
