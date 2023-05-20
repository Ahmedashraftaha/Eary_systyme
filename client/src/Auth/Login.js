import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    
  });
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      });
  
      setLoading(false);
      console.log(response.data);
      if (response.data.status === 0) {
        
        navigate("/panding");
      } else {
        setAuthUser(response.data);
        navigate("/");
      }
  
      console.log("success");
    } catch (error) {
      console.log(error, "error message");
      setLoading(false);
  
      let errorMsg = "An error occurred. Please try again later.";
      if (error.response?.data.error) {
        errorMsg = error.response?.data.error;
      }
  
      setError(errorMsg);
    }
  };
  

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      {error && (
  <Alert variant="danger" >
    {error}
  </Alert>
)}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            required
            value={login.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {!loading ? "login" : "Loading..."}
        </Button>
      </Form>
    </div>
  );
};

export default Login;