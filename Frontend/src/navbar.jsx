import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
function Navigationbar() {
  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            BClique
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/addfaculty">
                Add faculty
              </Nav.Link>
              <Nav.Link as={Link} to="/bloodbank">
                Bloodbank
              </Nav.Link>
              <Nav.Link as={Link} to="/notifications">
                Notifications
              </Nav.Link>
              <Nav.Link as={Link} to="/notes">
                Notes
              </Nav.Link>
              <Nav.Link as={Link} to="/swaprequest">
                Swap course
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
