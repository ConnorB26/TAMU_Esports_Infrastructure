import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/brand/maroon_logo.png';
import webpLogo from '../assets/brand/maroon_logo.webp';
import styles from './Header.module.css';
import '../styles/MaroonNavbarToggle.css';
import ScrollLink from './ScrollLink';

const baseImageSize = 116;

const NavLinks = ({ indices }: any) => {
    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/rosters', label: 'Rosters' },
        { to: '/awards', label: 'Awards' },
        { to: '/members', label: 'Members' }
    ];

    const scroll = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            {indices.map((index: any) => {
                const link = navLinks[index];
                return (
                    <NavLink
                        key={index}
                        to={link.to}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                        onClick={scroll}
                    >
                        {link.label}
                    </NavLink>
                );
            })}
        </>
    );
};

const Header: React.FC = () => {
    const [imageHeight, setImageHeight] = useState(baseImageSize);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const bottomDivRef = useRef<HTMLDivElement>(null);

    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
        const bottomDiv = bottomDivRef.current;
        if (bottomDiv) {
            const rect = bottomDiv.getBoundingClientRect();
            setImageHeight(Math.min(rect.bottom, baseImageSize));
        }
    };

    useEffect(() => {
        checkScreenSize();
        handleScroll();
        window.addEventListener("resize", () => {
            checkScreenSize();
            handleScroll();
        });

        const interval = setInterval(() => {
            checkScreenSize();
            handleScroll();
        }, 500);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {!isSmallScreen && (
                <Container fluid className={styles.topDiv}>
                    <Navbar.Brand className={styles.brandText}>Texas A&M University Esports</Navbar.Brand>
                    <div style={{ width: baseImageSize * 2.5 }} />
                    <Navbar.Brand className={styles.brandText}>Tagline Here</Navbar.Brand>
                </Container>
            )}
            <Navbar.Brand
                className={`${styles.brandLogo} ${isMouseDown ? styles.mouseDown : ''}`}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
            >
                <ScrollLink to="/">
                    <picture>
                        <source srcSet={webpLogo} type="image/webp" />
                        <img src={logo} alt="AME Logo" style={{ width: imageHeight, height: imageHeight }} />
                    </picture>
                </ScrollLink>
            </Navbar.Brand>
            <Container fluid ref={bottomDivRef} className={styles.bottomDiv}>
                {isSmallScreen ? (
                    <>
                        <Navbar expand={false} className={styles.navbar}>
                            <Navbar.Toggle className={styles.navbarToggle} />
                            <Navbar.Collapse>
                                <Nav>
                                    <NavLinks indices={[0, 1, 4, 2, 3]} />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </>
                ) : (
                    <>
                        <Container fluid className={`${styles.navContainer} ${styles.leftNav}`}>
                            <Nav>
                                <NavLinks indices={[0, 1, 4]} />
                            </Nav>
                        </Container>
                        <div style={{ width: baseImageSize * 2 }} />
                        <Container fluid className={`${styles.navContainer} ${styles.rightNav}`}>
                            <Nav>
                                <NavLinks indices={[2, 3]} />
                            </Nav>
                        </Container>
                    </>
                )}
            </Container>
        </>
    );
};

export default Header;