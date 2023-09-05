import React from 'react';
import styles from './Footer.module.css';
import { FaDiscord, FaTwitter, FaTwitch, FaTiktok, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Container } from 'react-bootstrap';

const socialLinks = [
    { Icon: FaDiscord, url: "https://discord.gg/tamuesports", className: styles.discordIcon },
    { Icon: FaInstagram, url: "https://www.instagram.com/tamuesports/", className: styles.instagramIcon },
    { Icon: FaTwitter, url: "https://www.twitter.com/tamuesports/", className: styles.twitterIcon },
    { Icon: FaTwitch, url: "https://www.twitch.tv/tamuesports", className: styles.twitchIcon },
    { Icon: FaFacebook, url: "https://www.facebook.com/TAMUEsports/", className: styles.facebookIcon },
    { Icon: FaTiktok, url: "https://www.tiktok.com/@tamuesports", className: styles.tiktokIcon },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/company/tamu-esports", className: styles.linkedInIcon }
];

const Footer: React.FC = () => {
    return (
        <Container fluid className={`${styles.footerContainer} text-center py-4`}>
            <Container fluid  className={styles.iconsContainer}>
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${link.className}`}>
                        <link.Icon />
                    </a>
                ))}
            </Container>
            <Container fluid className={styles.legalContainer}>
                <a href="/">Terms of Use</a> | <a href="/">Privacy Policy</a>
                <p>&copy; 2023 Texas A&M University Esports. All rights reserved.</p>
            </Container>
        </Container>
    );
};

export default Footer;
