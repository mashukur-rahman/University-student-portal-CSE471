import { Row, Col, Container, Form } from "react-bootstrap";
import Navigationbar from "./navbar";
import { useState } from "react";
import axios from "axios";
function Bloodrequest() {
  const [formData, setFromdata] = useState({
    email: sessionStorage.getItem("user"),
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();

    async function sendmessage() {
      const result = await axios.post("/api/bloodrequest", formData);
      if (result.data === "sent") {
        alert("Request posted");
      }
    }
    sendmessage();
  }

  return (
    <>
      <Form onSubmit={handleSubmission}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Post a blood request</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </Form>
    </>
  );
}

export default Bloodrequest;
