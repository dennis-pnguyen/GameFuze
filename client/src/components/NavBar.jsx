// import { useContext } from 'react';
import Search from './Search';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
  return (
    <>
      <Navbar
        expand="xl"
        fixed="top"
        className="bg-body-tertiary"
        data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">GameFuze</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/reviews">Reviews</Nav.Link>
              <Nav.Link href="/wishlist">Wishlist</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
