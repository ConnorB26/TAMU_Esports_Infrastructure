import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/brand/logotamu.png';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className={styles.navbar}>
            <Navbar.Brand as={Link} to="/" className={styles['navbar-brand']}>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="align-top"
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