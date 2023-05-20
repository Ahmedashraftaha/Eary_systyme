import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style/adduser.css";
import { getAuthUser } from "../../../helper/Storage";
import Swal from 'sweetalert2';

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("normal");
  const [status, setStatus] = useState("active");
  const auth = getAuthUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      phone: phone,
      password: password,
      role: role,
      email: email,
      status: status,
    };
    axios
      .post("http://localhost:4000/users", { ...data }, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'User created successfully',
          timer: 1500,
        }).then(() => {
          setName("");
          setPhone("");
          setEmail("");
          setPassword("");
          setRole("normal");
          setStatus("active");
          navigate("/manage-user");
        }); // display a swal success alert and reset the form and navigate to the manage user page after a delay
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="add-user-container">
        <h2>Create User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
             
            >
              <option value="0">Normal User</option>
              <option value="1">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddUser;