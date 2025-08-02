import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get('/api/myProfile')
        .then((res) => setUser(res.data.profile))
        .catch(() => {
          setToken(null);
          setUser(null);
        });
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const signup = async (username, password) => {
    const { data } = await axios.post('/api/user/signup', {
      username,
      password,
    });
    setToken(data.token);
    setUser(data.user);
    // useNavigate('/api/user/Board');
  };

  const login = async (username, password) => {
    const { data } = await axios.post('/api/user/login', {
      username,
      password,
    });
    setToken(data.token);
    // useNavigate('/api/user/Board');
  };

  const logout = () => {
    setToken(null);
    // useNavigate('/api/user/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
