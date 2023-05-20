import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './updateprofile.css'
const UpdateProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`,  )
      .then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      phone: phone,
    };
    axios
      .put(`http://localhost:4000/users/updateProfile/${id}`, { ...data } )
      .then((res) => {
        alert("Profile updated successfully");
        navigate(`/update-profile/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="update-profile-container">
        <h2>Update Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateProfile;
