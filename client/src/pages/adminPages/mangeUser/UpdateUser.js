import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style/updateuser.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getAuthUser } from "../../../helper/Storage";
import Swal from 'sweetalert2';


const UpdateUser = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  console.log(useParams());
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setRole(res.data.role);
        setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [auth.token, id]);
  
  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      phone: phone,
      role: role,
      status: status,
    };
    axios
      .put(`http://localhost:4000/users/${id}`,{ ...data }, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully',
          timer: 1500,
        }).then(() => {
          navigate("/manage-user");
        }); // display a swal success alert and navigate to the manage user page after a delay
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
    <Form onSubmit={handelSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>phone</Form.Label>
        <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="0">Normal User</option>
          <option value="1">Admin</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  </Container>
  
  );
};

export default UpdateUser;