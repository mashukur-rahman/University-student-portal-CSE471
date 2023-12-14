import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
function Swaprequestlist() {
  const [swaplist, setSwaplist] = useState([]);

  useEffect(() => {
    async function getswaplist() {
      const result = await axios.post("/api/getswaplist", { course: "hello" });
      setSwaplist(result.data);
    }
    getswaplist();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="home-link-title">All the requests</h1>
          {swaplist.map((request, idx) => {
            return (
              <>
                <Col md={4} key={idx}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Course: {request.course}</Card.Title>
                      <Card.Text>
                        <p>Section: {request.section}</p>
                        <p>Details: {request.details}</p>
                        <p>Posted by: {request.posted_by}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Swaprequestlist;
