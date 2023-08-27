import React, { useState, useEffect, useRef } from 'react';
import { Navbar, FormControl, Nav, Form, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/brand/logotamu.png';
import styles from './CustomHeader.module.css';

const baseImageSize = 116;

const CustomHeader: React.FC = () => {
  const [imageHeight, setImageHeight] = useState(baseImageSize);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const bottomDiv = bottomDivRef.current;
      if (bottomDiv) {
        const rect = bottomDiv.getBoundingClientRect();
        setImageHeight(Math.min(rect.bottom, baseImageSize));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.topDiv}>
        <Navbar.Brand style={{ color: 'var(--bs-primary)' }}>Texas A&M University eSports</Navbar.Brand>
        <div style={{ width: baseImageSize * 2.5 }}></div>
        <Form className={styles.searchForm}>
          <FormControl type="text" placeholder="Search" className={styles.searchControl} />
          <Button className={styles.searchButton}>
            <FaSearch />
          </Button>
        </Form>
      </div>
      <Navbar.Brand
        className={`${styles.brandLogo} ${isMouseDown ? styles.mouseDown : ''}`}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <Link to="/">
          <img src={logo} alt="Brand" style={{ width: imageHeight, height: imageHeight }} />
        </Link>
      </Navbar.Brand>
      <div ref={bottomDivRef} className={styles.bottomDiv}>
        <Nav>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Contact
          </NavLink>
        </Nav>
        <div style={{ width: baseImageSize * 2 }}></div>
        <Nav>
          <NavLink
            to="/rosters"
            className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Rosters
          </NavLink>
          <NavLink
            to="/awards"
            className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Awards
          </NavLink>
        </Nav>
      </div>
    </>
  );
};

export default CustomHeader;