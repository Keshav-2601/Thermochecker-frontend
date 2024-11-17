
// import './App.css';
import Login from './components/Loginpage.js';
import CreateLogin from './components/Createlogin.js';
import Homepage from './components/Homepage.js';
import Patientpage from './components/Patientspage.js';
import AdminloginPage from './components/AdminLoginPage.js';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateLogin />} />
        <Route path='/Homepage'element={<Homepage/>}/>
        <Route path="/admin" element={<Patientpage/>}/>
        <Route path='/adminlogin' element={<AdminloginPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
