import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../css/signIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });
  //for err msg
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //login submit
  const logInSubmit = async (e) => {
    e.preventDefault();
    console.log("login btn clicked");

    //destructure login form
    const { email, password } = logInForm;
    console.log(logInForm);
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        console.log("successfully looged in");
        // alert("successfully looged in");
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.error || "logIn failed. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card className="signin-card">
              <Card.Body>
                <h3 className="signin-title">Login</h3>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={logInSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="signin-input"
                      value={logInForm.email}
                      onChange={(e) =>
                        setLogInForm({ ...logInForm, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      className="signin-input"
                      value={logInForm.password}
                      onChange={(e) =>
                        setLogInForm({ ...logInForm, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      className="signin-button"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3">
                  <p className="signin-footer-text text-white">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="signin-link">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
