import axios from "axios";
import Navigationbar from "./navbar";
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Notecard from "./notecard";
function Notesearch() {
  const [search, setSearch] = useState("");
  const [searchresult, setSearchresult] = useState({});
  function handleinputchange(e) {
    const { value } = e.target;
    setSearch(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    async function submit() {
      const result = await axios.post("/api/searchnote", { search });
      console.log("search", result.data);
      setSearchresult(result.data);
    }
    submit();
  }

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-center first-row">
          <Col md={3} className="">
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
                  value={search}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </Form>
          </Col>
        </Row>
        <Row className="first-row">
          <Col md={3}>
            <Notecard data={searchresult} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Notesearch;
