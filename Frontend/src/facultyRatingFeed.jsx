import Navigationbar from "./navbar";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Facultycard from "./facultyCard";
function Facultyratingfeed() {
  const [formData, setFromdata] = useState({
    initial: "",
  });
  const [resultdata, setResultdata] = useState({});

  function handleinputchange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function submit() {
      const result = await axios.post("/api/searchfaculty", formData);
      if (result.data[0]) {
        setResultdata(result.data[0]);
      }
    }

    submit();
  }

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-center first-row">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Search by initial.."
                  name="initial"
                  value={formData.name}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Facultycard data={resultdata} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Facultyratingfeed;
