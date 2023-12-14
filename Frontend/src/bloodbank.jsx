import Navigationbar from "./navbar";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Donorlist from "./donorlist";
import Bloodrequest from "./bloodRequest";
import Bloodrequestlist from "./bloodRequestList";
import Myrequests from "./myRequests";
function Bloodbank() {
  const [formData, setFromdata] = useState({
    bloodgroup: "",
  });
  const [resultdata, setResultdata] = useState({});

  function handleinputchange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function submit() {
      const result = await axios.post("/api/searchdonor", formData);
      if (result.data.length > 0) {
        setResultdata(result.data);
        console.log(resultdata);
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
                  placeholder="Search by blood group.."
                  name="bloodgroup"
                  value={formData.bloodgroup}
                  onChange={handleinputchange}
                />
              </Form.Group>
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </Form>
          </Col>
        </Row>
        <Row className="first-row">
          <Col>
            <Donorlist list={resultdata} />
          </Col>
        </Row>

        <Row className="first-row">
          <Col>
            <Bloodrequest />
          </Col>
        </Row>
        <Row className="first-row">
          <Col>
            <Bloodrequestlist />
          </Col>
        </Row>
        <Row className="first-row">
          <Col>
            <Myrequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Bloodbank;
