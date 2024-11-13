// import React from "react";
// //import Button from 'react-bootstrap/Button';
// //import {Form} from 'react-bootstrap/Form';
// import { Link } from "react-router-dom";
// import './Createlogin.js'

// function Login() {
    
//     return (
//         <>
//             {/* <figure class="text-center">
//                 <blockquote class="blockquote">
//                     <p>ThermoChecker</p>
//                 </blockquote>
//             </figure>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" />
                    
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//                  <Link to="/createLogin">
//                  <p>
//                     Don't have account?
//                  </p>
//                </Link>
                
//             </Form> */}

//         </>
//     )
// }
// export default Login;
import React, { useState } from 'react';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', credentials);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>
            <label>
                Email:
                <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}
