import Header from './components/Header';
import Board from './components/Board';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login.jsx';
import { AuthProvider } from './AuthContext/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Header />
      {/* <Login /> */}
      {/* <Signup /> */}

      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */}
      <Board />
    </AuthProvider>
  );
}

export default App;
