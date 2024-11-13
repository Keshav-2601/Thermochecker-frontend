// import React from "react";
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import { Link } from "react-router-dom";
// function CreateLogin() {
//     return (
//         <>
//             <Form noValidate >
//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="4" controlId="validationCustom01">
//                         <Form.Label>First name</Form.Label>
//                         <Form.Control
//                             required
//                             type="text"
//                             placeholder="First name"
//                             defaultValue="Mark"
//                         />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group as={Col} md="4" controlId="validationCustom01">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             required
//                             type="Password"
//                             placeholder="password"
//                         />
                        
//                     </Form.Group>
//                     <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//                         <Form.Label>Email</Form.Label>
//                         <InputGroup hasValidation>
//                             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Email"
//                                 aria-describedby="inputGroupPrepend"
//                                 required
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 Please choose a username.
//                             </Form.Control.Feedback>
//                         </InputGroup>
//                     </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="6" controlId="validationCustom03">
//                         <Form.Label>address</Form.Label>
//                         <Form.Control type="text" placeholder="Address" required />
//                         <Form.Control.Feedback type="invalid">
//                             Please provide a valid city.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>
//                 <Button type="submit">Submit form</Button>
//                 <Link to='/'>
//                 <p>
//                     Already Have account?
//                 </p>
//                 </Link>
//             </Form>
//         </>
//     )
// }
// export default CreateLogin

import React, { useState } from 'react';

export default function CreateLogin() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Create Account</h2>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Create Account</button>
        </form>
    );
}
