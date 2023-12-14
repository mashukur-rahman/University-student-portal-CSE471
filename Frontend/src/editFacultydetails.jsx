import { useEffect, useState } from "react";
import Navigationbar from "./navbar";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
function Editfaculty() {
  const location = useLocation();

  const [details, setDetails] = useState({});
  useEffect(() => {
    async function getdetails() {
      const result = await axios.post("/api/searchfaculty", {
        initial: location.state.initial,
      });
      setDetails(result.data[0]);
    }
    getdetails();
  }, []);

  function handleinputchange(e) {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function updatefaculty() {
      const result = await axios.post("/api/updatefaculty", {
        ...details,
        previnitial: location.state.initial,
      });
      if (result.data === "Updated") {
        alert("Details updated");
      }
    }
    updatefaculty();
  }

  return (
    <>
      <Navigationbar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            name="name"
            value={details.name}
            onChange={handleinputchange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Initial</Form.Label>
          <Form.Control
            type="text"
            placeholder="ABC"
            name="initial"
            value={details.initial}
            onChange={handleinputchange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="john.doe@bracu.ac.bd"
            name="email"
            value={details.email}
            onChange={handleinputchange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Room</Form.Label>
          <Form.Control
            type="text"
            placeholder="UB70904"
            name="room"
            value={details.room}
            onChange={handleinputchange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="CSE220"
            name="course"
            value={details.course}
            onChange={handleinputchange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
}
export default Editfaculty;
