import { useState, useContext, use } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/'); // Redirect to home after login
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-lg'>
        <form onSubmit={submit}>
          <h2 className='text-2xl font-semibold text-center text-ebony mb-6'>
            Log In
          </h2>
          <label className='block text-ebony mb-1'>
            Username
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className='block text-ebony mb-1'>
            Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          >
            Log In
          </button>
          <p className='text-center text-sm text-ebony mt-4'>
            Don’t have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
