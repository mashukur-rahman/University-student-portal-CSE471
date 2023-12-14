import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./app.css";
import axios from "axios";
import Navigationbar from "./navbar";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const [login, setLogin] = useState();
  const groups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const [formData, setFromdata] = useState({
    name: "",
    id: "",
    department: "",
    session: "",
    phone: "",
    bloodgroup: groups[0],
  });

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setLogin(user);
    } else {
      navigate("/");
    }
  }, []);

  function handleSubmission(e) {
    e.preventDefault();
    async function submit() {
      const response = await axios.post("/api/profile", {
        ...formData,
        email: sessionStorage.getItem("user"),
      });
      if (response.data === "successful") {
        alert("Profile created");
      } else {
        alert("Could not create profile");
      }
    }
    submit();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  return (
    <>
      <Navigationbar />
      <Form className="profile-form" onSubmit={handleSubmission}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>ID No.</Form.Label>
          <Form.Control
            type="text"
            value={formData.id}
            name="id"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={formData.department}
            name="department"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Session</Form.Label>
          <Form.Control
            type="text"
            value={formData.session}
            name="session"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="text"
            value={formData.phone}
            name="phone"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Blood group</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={formData.bloodgroup}
            name="bloodgroup"
            onChange={handleInputChange}
          >
            {groups.map((group) => {
              return (
                <>
                  <option value={group}>{group}</option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>
        <button type="submit" className="btn btn-primary submit">
          Create
        </button>
      </Form>
    </>
  );
}

export default Profile;
