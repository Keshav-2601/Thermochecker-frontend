// import react from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
//  export default function Adminpage() {
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
//                         <Form.Label>Age</Form.Label>
//                         <Form.Control
//                             required
//                             type="number"
//                             placeholder="age"
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
//                         <Form.Label>Temperature</Form.Label>
//                         <Form.Control type="text" placeholder="temp..." required />
//                     </Form.Group>
//                 </Row>
//                 <Button type="submit">Submit form</Button>
//             </Form>
//         </>
//     )
// }
import React, { useState } from 'react';

export default function AdminPage() {
    const [adminData, setAdminData] = useState({ firstName: '', age: '', email: '', temperature: '' });

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Admin form submitted:', adminData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Admin Page</h2>
            <label>
                First Name:
                <input type="text" name="firstName" value={adminData.firstName} onChange={handleChange} required />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={adminData.age} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={adminData.email} onChange={handleChange} required />
            </label>
            <label>
                Temperature:
                <input type="text" name="temperature" value={adminData.temperature} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
