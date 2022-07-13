import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const onSignup = async () => {
    alert('Signup not implemented yet');
  };

  return (
    <div className="content-container">
      <h1>Signup</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        type="text"
        placeholder="someone@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <hr />
      <button
        disabled={!email || !password || password !== confirmPassword}
        onClick={onSignup}
      >
        Sign up
      </button>
      <button onClick={() => history.push('/login')}>
        Already have an account? Login
      </button>
    </div>
  );
};
