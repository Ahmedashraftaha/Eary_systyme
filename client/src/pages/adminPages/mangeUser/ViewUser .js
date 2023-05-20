import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const auth = getAuthUser();

  useEffect(() => {
    axios
      .get(`//localhost:4000/users/${id}`, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px"  , width:"40%"}}>
      <h2 style={{ marginBottom: "30px" }}>View User</h2>
      <Card style={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
        <Card.Body>
         
          <Card.Title style={{ fontSize: "24px", fontWeight: "bold" }}> <p>
              <strong>name:</strong> {user.name}
            </p></Card.Title>
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
          >
            
          </Card.Subtitle>
          <Card.Text style={{ fontSize: "18px" }}>
          <p style={{ fontSize: "18px" }}>
              <strong style={{ fontSize: "20px" }}>email:</strong> {user.email}
            </p>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Role:</strong> {user.role=="1"? "Admin" : "Normal"}
            </p>
            <p>
              <strong>Status:</strong> {user.status ? "Active" : "inactive"}
            </p>
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              to={`/manage-user/update/${user.id}`}
              variant="warning"
              className="btn btn-warning mr-2"
              style={{ fontWeight: "bold" }}
            >
              Update
            </Link>
            <Link
              to="/manage-user"
              className="btn btn-secondary"
              variant="secondary"
              style={{ fontWeight: "bold" }}
            >
              Back
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUser;
