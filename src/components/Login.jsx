import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Log In</h2>
      <label>Username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <label>Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </form>
  );
}
