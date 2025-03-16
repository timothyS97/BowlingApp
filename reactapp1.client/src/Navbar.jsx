import './Navbar.css';
import  Navbar  from 'react-bootstrap/Navbar';
import  Nav from 'react-bootstrap/Nav'; /* React-bootstrap added for responsiveness */
import  Container  from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function ApplicationNavbar()
{
    return (
        <Navbar className="navbarEdits" expand="lg">
            <Container fluid> 
                <Navbar.Brand as={Link} to="/">
                    Bowling App
                </Navbar.Brand>

                <Navbar.Toggle aira-controls="basic-navbar-nav" /> 

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            <i className="fa-solid fa-house"></i> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            <i className="fa-regular fa-envelope"></i> Contact Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            <i className="fa-solid fa-info"></i> About Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/help">
                            <i className="fa-regular fa-question"></i> Help
                        </Nav.Link>
                        <Nav.Link as={Link} to="/scoreboard">
                             Scoreboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/userform">
                            User Form
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="#">
                            <i className="fas fa-user"></i>Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    
    );
}

export default ApplicationNavbar;