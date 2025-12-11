import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../auth";

function NavBar() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    async function handleLogout() {
        const {error} = await supabase.auth.signOut();
        if (error) {
            return;
        }
        navigate("/login");
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Task Master</Navbar.Brand>
                {session && (
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/todo">To-Do List</Nav.Link>
                        <Nav.Link as={Link} to="/overdue">Overdue</Nav.Link>
                        <Nav.Link as={Link} to="/completed">Completed</Nav.Link>
                        <Nav.Link as={Link} to="/pastevents">Past Events</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
}

export default NavBar