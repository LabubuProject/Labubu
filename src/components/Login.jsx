import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import Header from './Header.jsx';

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
      alert('Login failed', err);
    }
  };

  return (
    <div className='min-h-screen flex flex-col space-y-6 items-center justify-center px-4'>
      <Header flips={0} gameStarted={false} gameWon={false} />
      <div className='w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-lg'>
        <form onSubmit={submit}>
          <h2 className='text-2xl font-semibold text-center text-ebony mb-6'>
            Log In
          </h2>
          <label htmlFor='username' className='block text-ebony mb-1'>
            Username
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor='password' className='block text-ebony mb-1'>
            Password
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type='submit'
            className='w-full bg-[#A1D6D4] text-white py-2 rounded hover:bg-[#41A5A4] focus:outline-none focus:ring-2 focus:ring-[#41A5A4] transition'
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
