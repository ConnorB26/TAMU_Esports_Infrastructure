import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import ameLogo from '../assets/brand/maroon_logo.png';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { user } = useAuth();

    return (
        <Navbar expand="lg" sticky="top" className={styles.headerGradient}>
            <Container className={styles.navContainer}>
                <Navbar.Brand as={NavLink} to="/" className={styles.navBrand}>
                    <img src={ameLogo} className={styles.logo} alt="Logo" />
                    <span className={styles.brandText}>Reservation System</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navToggle} />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.navCollapse}>
                    <Nav className="me-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                            Home
                        </NavLink>
                        {user?.reservation_access && <NavLink to="/reservations" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                            Reservations
                        </NavLink>}
                        {user?.is_admin && <NavLink to="/admin" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                            Admin
                        </NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;