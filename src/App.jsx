import Header from './components/Header';
import Board from './components/Board';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Board />
    </div>
  );
}

export default App;
