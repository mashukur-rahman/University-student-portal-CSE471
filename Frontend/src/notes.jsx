import { Form, Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
function Notes() {
  const [formData, setFormdata] = useState({
    code: "",
    link: "",
  });

  const [notelist, setNotelist] = useState([]);

  useEffect(() => {
    async function getmynotes() {
      const result = await axios.post("/api/getmynotes", {
        uploader: sessionStorage.getItem("user"),
      });
      setNotelist(result.data);
    }
    getmynotes();
  }, []);

  function handleinputchange(e) {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function submit() {
      const result = await axios.post("/api/postresource", {
        ...formData,
        uploader: sessionStorage.getItem("user"),
      });
    }
    submit();
    alert("Note has been added");
  }

  function deletenote(course) {
    async function deletenotes() {
      const result = axios.post("/api/deletemynote", { course: course });
      setNotelist(notelist.filter((note) => note.course !== course));
    }
    deletenotes();
  }

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-center first-row">
          <Col md={6}>
            <h1>Add a note</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="code"
                  value={formData.code}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Drive link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="link"
                  value={formData.link}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Col>

          <h1 className="home-link-title" style={{ marginTop: "2%" }}>
            My notes
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {notelist.map((note, idx) => {
                return (
                  <>
                    <tr key={idx}>
                      <td>{note.course}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => deletenote(note.course)}
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
        </Row>
        <Row className="justify-content-center first-row">
          <Col md={6}>
            <h1 className="home-link-title">Or</h1>
            <Link to="/notesearch">
              <button className="btn btn-primary">Search a note</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Notes;
