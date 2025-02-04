// frontend/src/components/LoginFormPage/LoginFormPage.jsx
// added below for phase 1 of frontend readme
import { useState } from 'react';
import * as sessionActions from '../../store/session';
// changed below for phase 4 of frontend readme
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// 
// added below for phase 4 of frontend readme
import { useModal } from '../../context/Modal';
// 
// removed below for phase 4 of frontend readme
// import { Navigate } from 'react-router-dom';
// 
// added below for phase 1 of frontend readme
// ...
import './LoginForm.css';
// ...
// 

// changed below for phase 4 of frontend readme
// function LoginFormPage() {
  function LoginFormModal() {
  // 
  const dispatch = useDispatch();
// removed below for phase 4 of frontend readme
  // const sessionUser = useSelector((state) => state.session.user);
  // 
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // added below for phase 4 of frontend readme
  const { closeModal } = useModal();
  // 

  // removed below for phase 4 of frontend readme
  // if (sessionUser) return <Navigate to="/" replace={true} />;
// 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    // added below for phase 4 of frontend readme
    .then(closeModal)
    // 
    .catch(
      async (res) => {
        const data = await res.json();
        // changed below for phase 4 of frontend readme
        // if (data?.errors) 
        if (data && data.errors) {
          // 
          setErrors(data.errors);
      }
      // changed below for phase 4 of frontend readme
    // );
  });
    // 
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

// changed below for phase 4 of frontend readme
// export default LoginFormPage;
export default LoginFormModal;
// 
// 