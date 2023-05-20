import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import "./register.css"
const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    loading: false,
  });
  const [error, setError] = useState(null);
  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true });
    axios
      .post("http://localhost:4000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
        phone: register.phone,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false});
        //setAuthUser(resp.data);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setRegister({
          ...register,
          loading: false,
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Registration Form</h1>

      {error && (
  <Alert variant="danger" className="p-2">
    {error}
  </Alert>
      )
}


      <Form onSubmit={RegisterFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="phone"
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>
        {/* 
        <Form.Group className="mb-3">
          <Form.Select
            value={register.role}
            onChange={(e) => setRegister({ ...register, role: e.target.value })}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </Form.Select>
        </Form.Group> */}

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={register.loading === true}
        >
          register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
