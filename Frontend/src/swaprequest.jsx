import axios from "axios";
import Navigationbar from "./navbar";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Swaprequestlist from "./swaprequestlist";
function Swaprequest() {
  const [formData, setFormdata] = useState({
    course: "",
    section: "",
    details: "",
    student: sessionStorage.getItem("user"),
  });

  function handleInpurChange(e) {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();
    async function formsubmit() {
      const result = await axios.post("/api/addswap", formData);
    }
    formsubmit();
    alert("Swap requested");
  }

  return (
    <>
      <Navigationbar />
      <h1 className="home-link-title">Add a swap request</h1>
      <Form className="reg-form" onSubmit={handleSubmission}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            value={formData.course}
            name="course"
            onChange={handleInpurChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            value={formData.section}
            name="section"
            onChange={handleInpurChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.details}
            name="details"
            onChange={handleInpurChange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
      <hr />
      <Swaprequestlist />
    </>
  );
}

export default Swaprequest;
