
import './App.css';
import Login from './components/Loginpage';
import CreateLogin from './components/Createlogin';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createLogin" element={<CreateLogin />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
