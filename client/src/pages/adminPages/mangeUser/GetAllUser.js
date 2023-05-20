import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";
import Swal from 'sweetalert2';
const GetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("0");
  const auth = getAuthUser();

  useEffect(() => {
    axios
      .get("http://localhost:4000/users", {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data)})
      .catch((err) => console.log(err));
  }, [auth.token, status]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/users/${id}`, {
            headers: {
              token: auth.token,
            },
          })
          .then((res) => {
            setUsers(users.filter((user) => user.id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleStatusChange = (id, status) => {
    axios
      .put(
        `http://localhost:4000/users/updateStatus/${id}`,
        { status: status },
        { headers: { token: auth.token } }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'User status updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setUsers(
          users.map((user) => {
            if (user.id === id) {
              user.status = status ? '1' : '0';
              setStatus(status);
            }
            return user;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="col-10">
        <h2 className="my-4">All Users</h2>
        <Link className="btn btn-success" variant="success" to={"add"}>
          Add User
        </Link>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role== '1' ? 'admin':"normal"}</td>
                <td>{user.phone}</td>
                <td>
                  <Button
                    variant={user.status ? "success" : "danger"}
                    onClick={() =>
                      handleStatusChange(user.id, user.status ? '0' : '1')
                    }
                  >
                    {user.status ? "Active" : "Inactive"}
                  </Button>
                </td>
                <td>
  <Link
    className="btn btn-danger mr-2"
    variant="danger"
    onClick={() => handleDelete(user.id)}
  >
    Delete
  </Link>
  <Link
    className="btn btn-warning ml-2"
    to={`update/${user.id}`}
    variant="warning"
  >
    Update
  </Link>
  <Link
    to={`view/${user.id}`}
    className="btn btn-primary ml-2"
  >
    View
  </Link>
</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllUser;
