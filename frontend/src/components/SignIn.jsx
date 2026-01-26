import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../css/signIn.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  //err state
  const [error, setError] = useState("");

  const navigate = useNavigate()

  //onSubmit function
  const signInSubmit = async (e) => {
    e.preventDefault();
    // Destructure formData
    const { fullname, phoneNumber, email, password } = formData;
    console.log(formData);
    if (!fullname || !phoneNumber || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        full_name: fullname,
        phone_number: phoneNumber,
        email: email,
        password: password,
      });
      if (response.data.message) {
        console.log(response.data.message);
        alert("successfully added");
        navigate("/login")
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Signup failed. Try again later."
      );
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
                <h3 className="signin-title">Sign In</h3>
                {/* Display error message if error state is not empty */}
                {error && <div className="error-message">{error}</div>}
                <Form onSubmit={signInSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      className="signin-input"
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      className="signin-input"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="signin-input"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      className="signin-input"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      className="signin-button"
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignInForm;
