import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext.jsx';
import Header from './Header.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/', { replace: true });
    } catch (err) {
      alert(`${err}:Invalid username or password`);
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
          <label htmlFor='username' className='block text-ebony mb-1 text-lg'>
            Username
            <input
              type='text'
              id='username'
              name='username'
              className='ml-1 min-w-[230px] border-2 rounded-md border-gray-100 focus:border-teal-500 focus:outline-none'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor='password' className='block text-ebony mb-1 text-lg'>
            Password
            <input
              type='password'
              id='password'
              name='password'
              className='ml-1 min-w-[235px] border-2 rounded-md border-gray-100 focus:border-teal-500 focus:outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type='submit'
            className='w-full text-white py-2 rounded bg-[#A1D6D4] hover:bg-[#41A5A4] focus:ring-[#41A5A4] focus:outline-none focus:ring-2 transition'
          >
            Log In
          </button>
          <p className='text-center text-sm text-ebony mt-4'>
            {`Don’t have an account? `}
            <Link className='underline' to='/signup'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
