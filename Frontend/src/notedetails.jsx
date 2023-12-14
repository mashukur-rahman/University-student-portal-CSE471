import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigationbar from "./navbar";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import Notecommentlist from "./notecommentlist";
function Notedetails() {
  const location = useLocation();
  const [formData, setFromdata] = useState({
    commentator: sessionStorage.getItem("user"),
    comment: "",
    course: location.state.course,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();

    async function sendmessage() {
      const result = await axios.post("/api/notecommentinsert", formData);
      console.log(result.data);
    }
    sendmessage();
    alert("Comment posted");
  }
  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-center first-row">
          <Col md={6} className="d-flex justify-content-center">
            <div>
              <Card style={{ width: "70%", marginLeft: "15%" }}>
                <Card.Body>
                  <Card.Title>Course: {location.state.course}</Card.Title>
                  <Card.Text>
                    <h5>
                      Materials:{" "}
                      <Link to={location.state.link}>
                        {location.state.link}
                      </Link>{" "}
                    </h5>
                    <h6>Uploaded by: {location.state.uploader}</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Row className="first-row">
                <Notecommentlist course={location.state.course} />
              </Row>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Form onSubmit={handleSubmission} style={{ width: "70%" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Notedetails;
