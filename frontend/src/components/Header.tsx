import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
            <Navbar.Brand as={Link} to="/" className={styles['navbar-brand']}>
                <img
                    alt=""
                    src="/path/to/brand-logo.png" // Replace with the path to your logo
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                TAMU eSports
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item className={styles['nav-link']}>
                        <NavLink to="/" className={({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active}` : '')}>
                            Home
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item className={styles['nav-link']}>
                        <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active}` : '')}>
                            About
                        </NavLink>
                    </Nav.Item>
                    {/*
                    <Nav.Item className={styles['nav-link']}>
                        <NavLink to="/rosters" className={({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active}` : '')}>
                            Rosters
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item className={styles['nav-link']}>
                        <NavLink to="/awards" className={({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active}` : '')}>
                            Awards
                        </NavLink>
                    </Nav.Item>
                    */}
                    <Nav.Item className={styles['nav-link']}>
                        <NavLink to="/contact" className={({ isActive }: { isActive: boolean }) => (isActive ? `${styles.active}` : '')}>
                            Contact
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;