import Header from './components/Header';
import Board from './components/Board';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login.jsx';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Login />
      {/* <Signup /> */}
      
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */}
      {/* <Board /> */}
    </div>
  );
}

export default App;
