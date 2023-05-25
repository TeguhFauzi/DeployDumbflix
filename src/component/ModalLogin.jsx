import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";

export const ModalLogin = (props) => {
  let Navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const ChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  // Mengubah dan menghapus data pada server
  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post("/login", formLogin);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      // Status check
      if (response.data.data.is_admin === true) {
        Navigate("/");
      } else {
        Navigate("/");
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormLogin({
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
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
          onSubmit={(e) => handleLogin.mutate(e)}
        >
          <h2
            style={{ color: "white" }}
            className="d-flex fw-bold mb-4 mt-3 justify-content-center"
          >
            Login
          </h2>
          <div className="d-grid gap-2">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={formLogin.email}
                onChange={ChangeLogin}
                name="email"
                placeholder="Email"
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={formLogin.password}
                onChange={ChangeLogin}
                name="password"
                className="form-check-label"
                placeholder="Password"
                style={{
                  border: "1px solid",
                  backgroundColor: "#D2D2D2",
                }}
              />
            </Form.Group>
            <div className="d-grid">
              <Button className="border-0 fw-bold" style={{backgroundColor:"#E50914"}} type="submit" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p style={{color:"#B1B1B1"}}>Don't have an account? Klik</p>
            <Link to="/" onClick={props.onClick} className="ms-1 text-decoration-none fw-bold" style={{color:"#B1B1B1"}}>
              Here
            </Link>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalLogin;
