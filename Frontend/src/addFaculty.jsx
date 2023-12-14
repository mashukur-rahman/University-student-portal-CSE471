import Navigationbar from "./navbar";
import { Row, Col, Container, Form, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Add from "./assets/Add.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Addfaculty() {
  const navigate = useNavigate();
  const [formData, setFromdata] = useState({
    student: "",
    name: "",
    initial: "",
    email: "",
    room: "",
    course: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [newfacadded, setNewfacadded] = useState(false);
  function handleinputchange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function submit() {
      const result = await axios.post("/api/addfaculty", formData);
      if (result.data === "Already registered") {
        alert("Faculty Already Exists");
      } else if (result.data === "registered") {
        alert("Faculty added");
      }
    }

    submit();
    setNewfacadded(true);
  }

  function deletefaculty(initials) {
    async function removefaculty() {
      const result = await axios.post("/api/deletefaculty", {
        initial: initials,
      });
      console.log(result.data);
    }
    removefaculty();
    setFaculties(faculties.filter((faculty) => faculty.initial !== initials));
  }

  useEffect(() => {
    async function getfaculties() {
      const result = await axios.post("/api/addedfaculty", {
        student: sessionStorage.getItem("user"),
      });
      if (result.data.length > 0) {
        setFaculties(result.data);
      }
    }
    getfaculties();
  }, [newfacadded]);

  useEffect(() => {
    const stu = sessionStorage.getItem("user");
    setFromdata({ ...formData, student: stu });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="first-row">
          <Col>
            <img src={Add} alt="Add faculty" />
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Initial</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ABC"
                  name="initial"
                  value={formData.initial}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="john.doe@bracu.ac.bd"
                  name="email"
                  value={formData.email}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Room</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UB70904"
                  name="room"
                  value={formData.room}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CSE220"
                  name="course"
                  value={formData.course}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Col>
        </Row>

        <Row className="first-row">
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => {
                  return (
                    <>
                      <tr key={faculty.initial}>
                        <td>{faculty.initial}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              navigate("/editfaculty", {
                                state: { initial: faculty.initial },
                              });
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              deletefaculty(faculty.initial);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Addfaculty;
