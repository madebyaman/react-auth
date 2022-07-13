import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async () => {
    alert('Login not implemented yet');
  };

  return (
    <div className="content-container">
      <h1>Login</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        type="text"
        placeholder="someone@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <hr />
      <button onClick={onLogin} disabled={!email || !password}>
        Log In
      </button>
      <button onClick={() => history.push('/forgot-password')}>
        Forgot Password
      </button>
      <button onClick={() => history.push('/signup')}>Create an account</button>
    </div>
  );
};
