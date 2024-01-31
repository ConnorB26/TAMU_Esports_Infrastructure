import React from 'react';
import styles from './Footer.module.css';
import { Container } from 'react-bootstrap';
import { getSocialLinks } from './SocialLinks';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <Container fluid className={`${styles.footerContainer} text-center py-4`}>
            <Container fluid className={styles.socialList}>
                {getSocialLinks(false)}
            </Container>
            <Container fluid className={styles.legalContainer}>
                <NavLink to='/terms'> Terms of Use </NavLink> | <NavLink to='/privacy'> Privacy Policy </NavLink>
                <p>&copy; 2023 Texas A&M University Esports. All rights reserved.</p>
            </Container>
        </Container>
    );
};

export default Footer;
