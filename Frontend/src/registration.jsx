import community from "./assets/community.svg";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./app.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [formData, setFormdata] = useState({ email: "", password: "" });

  function handleInpurChange(e) {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();
    async function formsubmit() {
      const result = await axios.post("/api/register", formData);
      if (result.data === "Already registered") {
        alert("Account already exists");
      } else if (result.data === "registered") {
        alert("Registered successfully");
      }
    }
    formsubmit();
  }
  return (
    <>
      <Container fluid>
        <Row className="reg-landing-row">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={community}
              alt="registration landing image"
              className="reg-landing-image"
            />
          </Col>
          <Col md={6} className="reg-form-col">
            <div className="reg-form-div">
              <h1>BClique</h1>

              <Form className="reg-form" onSubmit={handleSubmission}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    name="email"
                    onChange={handleInpurChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="123#@Abcd"
                    name="password"
                    value={formData.password}
                    onChange={handleInpurChange}
                  />
                </Form.Group>
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </Form>
              <h1>
                <Link to="/">
                  <h6>Login here</h6>
                </Link>
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
