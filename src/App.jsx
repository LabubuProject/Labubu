import { Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import Signup from './components/Signup';
import Login from './components/Login.jsx';
import { AuthProvider } from './AuthContext/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
