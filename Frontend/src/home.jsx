import Navigationbar from "./navbar";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import rating from "./assets/rating.svg";
import { Container, Row, Col } from "react-bootstrap";
import notes from "./assets/notes.svg";
import community from "./assets/community.svg";
function Home() {
  const navigate = useNavigate();
  const [login, setLogin] = useState();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setLogin(user);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navigationbar />
      <Container fluid>
        <Row className="justify-content-around first-row">
          <Col md={3} className="d-flex justify-content-center">
            <Link to="/facultyratingfeed">
              <img src={rating} alt="Rate faculties" />
              <h1 className="home-link-title">Ratings & reviews</h1>
            </Link>
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <Link to="/facultyratingfeed">
              <img src={notes} alt="Rate faculties" />
              <h1 className="home-link-title">Study materials</h1>
            </Link>
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <Link to="/facultyratingfeed">
              <img src={community} alt="Rate faculties" />
              <h1 className="home-link-title">Donor community</h1>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
