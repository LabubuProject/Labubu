import { useState, useContext, use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password);
      navigate('/'); // Redirect to home after signup
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6 items-center justify-center px-4">
        <Header flips={0} gameStarted={false} gameWon={false} />
      <div className='w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-lg'>
        <form onSubmit={submit}>
          <h2 className='text-2xl font-semibold text-center text-ebony mb-6'>
            Sign Up
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
