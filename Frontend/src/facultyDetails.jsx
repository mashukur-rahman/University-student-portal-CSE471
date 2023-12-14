import Navigationbar from "./navbar";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
function Facultydetails() {
  const location = useLocation();
  const [check, setCheck] = useState(false);
  const [formData, setFromdata] = useState({
    rating: "1",
    comment: "",
  });

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getreviews() {
      const result = await axios.post("/api/getreviews", {
        initial: location.state.initial,
      });
      if (result.data.length > 0) {
        setReviews(result.data);
      }
    }
    getreviews();
  }, [check]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFromdata({ ...formData, [name]: value });
  }

  function handleSubmission(e) {
    e.preventDefault();
    async function submitreview() {
      const result = await axios.post("/api/submitreview", {
        ...formData,
        student: sessionStorage.getItem("user"),
        faculty: location.state.initial,
      });
      if (result.data === "inserted") {
        alert("Review posted");
      } else {
        alert("Could not post the review");
      }
    }
    submitreview();
    setCheck(true);
  }

  return (
    <>
      <Navigationbar />
      <Container>
        <Row className="first-row">
          <Col md={6}>
            <Row>
              <Card style={{ width: "80%", marginLeft: "10%" }}>
                <Card.Body>
                  <Card.Title>{location.state.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {location.state.initial}
                  </Card.Subtitle>
                  <Card.Text>
                    {location.state.email} {location.state.room}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              {reviews.map((review) => {
                return (
                  <>
                    <Card
                      style={{
                        width: "50%",
                        marginLeft: "25%",
                        marginTop: "5%",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{review.added_by}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Rated: {review.rating}/5
                        </Card.Subtitle>
                        <Card.Text>Comment: {review.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
            </Row>
          </Col>
          <Col md={6}>
            <Form className="profile-form" onSubmit={handleSubmission}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.rating}
                  name="rating"
                  onChange={handleInputChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Facultydetails;
