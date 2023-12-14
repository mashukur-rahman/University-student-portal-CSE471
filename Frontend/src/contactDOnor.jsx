import { useLocation } from "react-router-dom";
import Navigationbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
function Contactdonor() {
  const [donor, setDonor] = useState({});

  useEffect(() => {
    async function getprofile() {
      const result = await axios.post("/api/getprofile", {
        email: location.state.email,
      });
      console.log(result.data[0]);
      if (result.data.length > 0) {
        setDonor(result.data[0]);
        console.log("donor", donor);
      }
    }
    getprofile();
  }, []);

  const location = useLocation();

  const [formData, setFromdata] = useState({
    email: location.state.email,
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();

    async function sendmessage() {
      const result = await axios.post("/api/sendmessage", {
        message: formData.message,
        receiver: location.state.email,
        sender: sessionStorage.getItem("user"),
      });
      if (result.data === "sent") {
        alert("Message sent");
      }
    }
    sendmessage();
  }
  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-center first-row">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{donor.name}</Card.Title>
                <Card.Text>
                  <h5>{donor.email}</h5>
                  <h6>{donor.phone}</h6>
                  <h6>{donor.department}</h6>
                  <h6>{donor.bloodgroup}</h6>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center first-row">
          <Col md={4}>
            <Form onSubmit={handleSubmission}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Contactdonor;
