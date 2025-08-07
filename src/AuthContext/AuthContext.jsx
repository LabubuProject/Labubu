/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get('/api/user/myProfile')
        .then((res) => setUser(res.data.profile))
        .catch((err) => {
          console.log('user error', err);
        });
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const signup = async (username, password) => {
    try {
      const { data } = await axios.post('/api/user/signup', {
        username,
        password,
      });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed. Try again',
      }
    }
  }
  const login = async (username, password) => {
    try {
      const { data } = await axios.post('/api/user/login', {
        username,
        password,
      });
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}

