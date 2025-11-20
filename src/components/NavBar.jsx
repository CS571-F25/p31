import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Task Master</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/todo">To-Do List</Nav.Link>
                    <Nav.Link as={Link} to="/notes">Sticky Notes</Nav.Link>
                    <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar