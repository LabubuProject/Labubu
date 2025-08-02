import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await signup(username, password);
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
