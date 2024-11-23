
// import './App.css';
import Login from './components/Loginpage.js';
import CreateLogin from './components/Createlogin.js';
import Homepage from './components/Homepage.js';
import Patientpage from './components/Patientspage.js';
import AdminloginPage from './components/AdminLoginPage.js';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AdminHomepage from './components/AdminHomepage.js';
import Protectedroute from './components/ProtectedRoute.js';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<CreateLogin />} />
          <Route
            path="/Homepage"
            element={
              <Protectedroute requiredRole="User">
                <Homepage />
              </Protectedroute>
            }
          />
          <Route
            path="/AdminHomepage"
            element={
              <Protectedroute requiredRole="Admin">
                <AdminHomepage />
              </Protectedroute>
            }
          />
          <Route
            path="/admin"
            element={
              <Protectedroute requiredRole="Admin">
                <Patientpage />
              </Protectedroute>
            }
          />
          <Route path="/adminlogin" element={<AdminloginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
