import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const Header: React.FC = () => {
    const { user } = useAuth();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">AME PC Reservation System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        {user?.reservation_access && <Nav.Link as={NavLink} to="/reservation" end>Reservation</Nav.Link>}
                        {user?.is_admin && <Nav.Link as={NavLink} to="/admin" end>Admin</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
