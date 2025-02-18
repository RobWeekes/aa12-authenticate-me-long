// // // frontend/src/components/LoginFormPage/LoginFormPage.jsx
// // // added below for phase 1 of frontend readme
// // import { useState } from 'react';
// // import * as sessionActions from '../../store/session';
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
// // // added below for phase 1 of frontend readme
// // // ...
// // import './LoginForm.css';
// // // ...
// // // 

// // // changed below for phase 4 of frontend readme
// // // function LoginFormPage() {
// // function LoginFormModal() {
// //   // 
// //   const dispatch = useDispatch();
// //   // removed below for phase 4 of frontend readme
// //   // const sessionUser = useSelector((state) => state.session.user);
// //   // 
// //   const [credential, setCredential] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});
// //   // added below for phase 4 of frontend readme
// //   const { closeModal } = useModal();
// //   // 

// //   // removed below for phase 4 of frontend readme
// //   // if (sessionUser) return <Navigate to="/" replace={true} />;
// //   // 

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setErrors({});
// //     return dispatch(sessionActions.login({ credential, password }))
// //       // added below for phase 4 of frontend readme
// //       .then(closeModal)
// //       // 
// //       .catch(
// //         async (res) => {
// //           const data = await res.json();
// //           // changed below for phase 4 of frontend readme
// //           // if (data?.errors) 
// //           if (data && data.errors) {
// //             // 
// //             setErrors(data.errors);
// //           }
// //           // changed below for phase 4 of frontend readme
// //           // );
// //         });
// //     // 
// //   };

// //   return (
// //     <>
// //       <h1>Log In</h1>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Username or Email
// //           <input
// //             type="text"
// //             value={credential}
// //             onChange={(e) => setCredential(e.target.value)}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Password
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </label>
// //         {/* // changed below for phase 4 of frontend readme */}
// //         {/* {errors.credential &&  */}
// //         {errors.credential && (
// //           // 
// //           // {/* // changed below for phase 4 of frontend readme */}
// //           <p>{errors.credential}</p>
// //           // }
// //         )}
// //         {/* //  */}
// //         <button type="submit">Log In</button>
// //       </form>
// //     </>
// //   );
// // }

// // // changed below for phase 4 of frontend readme
// // // export default LoginFormPage;
// // export default LoginFormModal;
// // // 
// // // 
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/actions/authActions';
// import LoginFormModal from '.';

// const LoginFormModal = ({ closeModal }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     // Mock login
//     if (username === 'demo' && password === 'demo') {
//       dispatch(login({ username }));
//       closeModal();
//     } else {
//       setError('The provided credentials were invalid');
//     }
//   };

//   return (
//     <div className="modal">
//       <h2>Log In</h2>
//       <input
//         type="text"
//         placeholder="Username or Email"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {error && <p className="error">{error}</p>}
//       <button onClick={handleLogin}>Log In</button>
//       <p onClick={() => alert('Demo User feature coming soon')}>Demo User</p>
//     </div>
//   );
// };

// export default LoginFormModal;
import { useState } from 'react';

const LoginFormModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    onLogin(email, password)
      .then(() => {
        onClose();
      })
      .catch(() => {
        setError('The provided credentials were invalid');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Log In</button>
      </form>

      <p className="demo-link" onClick={() => alert('Demo User feature coming soon')}>
        Demo User
      </p>

      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default LoginFormModal;
