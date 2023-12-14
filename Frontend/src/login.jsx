import login from "./assets/login.svg";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./app.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({ email: "", password: "" });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();
    async function formsubmit() {
      const result = await axios.post("/api/login", formData);
      if (result.data) {
        console.log(typeof result.data.email);
        sessionStorage.setItem("user", result.data.email);
        navigate("/home");
      } else {
        alert("User not found");
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
              src={login}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </Form>

              <Link to="/forgot">
                <h6>Forgot password?</h6>
              </Link>
              <Link to="/register">
                <h6>Register here</h6>
              </Link>

              <LoginSocialFacebook
                appId="249514457818256"
                onResolve={({ data }) => {
                  sessionStorage.setItem("user", data.email);
                  navigate("/home");
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <div className="facebook-login">
                  <FacebookLoginButton />
                </div>
              </LoginSocialFacebook>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
