import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
    isAuthorized: boolean;
}

const AppNavbar: React.FC<HeaderProps> = ({ isAuthorized }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">AME PC Reservation System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        {isAuthorized && <Nav.Link as={NavLink} to="/admin" end>Admin</Nav.Link>}
                        {/* More NavLink components can be added here */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
