// // // frontend/src/components/LoginFormModal/LoginFormModal.jsx
// import { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       // Call the login action and wait for it to complete
//       await dispatch(sessionActions.login({ credential, password }));
//       // If login is successful, close the modal
//       closeModal();
//     } catch (error) {
//       // If there's an error, handle it
//       if (error && error.errors) {
//         setErrors(error.errors);
//       } else {
//         // If the error doesn't have the expected structure, set a generic error
//         setErrors({ credential: "The provided credentials were invalid" });
//       }
//     }
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.credential && (
//           <p className="error">{errors.credential}</p>
//         )}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormModal;





// frontend/src/components/LoginFormModal/LoginFormModal.jsx
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Call the login action and wait for it to complete
      await dispatch(sessionActions.login({ credential, password }));
      // If login is successful, close the modal
      closeModal();
    } catch (error) {
      // If there's an error, handle it
      if (error && error.errors) {
        setErrors(error.errors);
      } else {
        // If the error doesn't have the expected structure, set a generic error
        setErrors({ credential: "The provided credentials were invalid" });
      }
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p className="error">{errors.credential}</p>
          )}
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
