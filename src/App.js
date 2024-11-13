
// import './App.css';
import Login from './components/Loginpage.js';
import CreateLogin from './components/Createlogin.js';
//import Homepage from './components/Homepage.js';
import Adminpage from './components/Adminpage.js';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createLogin" element={<CreateLogin />} />
        {/* <Route path='/Homepage'element={<Homepage/>}/> */}
        <Route path="/admin" element={<Adminpage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
