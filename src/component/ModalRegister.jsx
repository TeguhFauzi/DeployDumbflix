import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import "../index.css";

//store
const ModalRegister = (props) => {
  const [formRegister, setFormRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    gender:"",
    phone:"",
    address:"",
    
  });

  const { fullname, email, password, gender, phone, address } = formRegister;

  const ChangeRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  // Mengubah data pada server
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", formRegister);

      console.log("register success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormRegister({
        fullname: "",
        email: "",
        password: "",
        gender:"",
        phone:"",
        address:"",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    props.onHide();
  });

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Form
          className="bg-dark pt-4 pb-4 ps-5 pe-5 rounded"
          onSubmit={(e) => handleSubmit.mutate(e)}
        >
          <h2 className="d-flex fw-bold mb-4 text-white justify-content-center">
            Register
          </h2>
          <div className="d-grid gap-2">
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Full name"
                required
                value={fullname}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select 
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
                onChange={ChangeRegister}
                name="gender"
                required
                type="text"
                value={gender}
              >
                 <option hidden>Gender</option>
                 <option value="Man">Man</option>
                 <option value="Woman">Woman</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                required
                value={phone}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                required
                value={address}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <div className="d-grid">
              <Button className="bg-white text-danger fw-bold border-0" type="submit">
                Register
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p style={{color:"#B1B1B1"}}>Already have an account? Klik </p>
            <Link to="/" onClick={props.onClick} className=" ms-1 text-decoration-none fw-bold" style={{color:"#B1B1B1"}}>
              Here
            </Link>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalRegister;

