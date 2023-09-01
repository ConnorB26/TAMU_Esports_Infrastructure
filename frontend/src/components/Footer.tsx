import React from 'react';
import styles from './Footer.module.css';
import { FaDiscord, FaTwitter, FaTwitch, FaTiktok, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.iconsContainer}>
                <a href="https://discord.gg/tamuesports" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.discordIcon}`}><FaDiscord /></a>
                <a href="https://www.instagram.com/tamuesports/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagramIcon}`}><FaInstagram /></a>
                <a href="https://www.twitter.com/tamuesports/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.twitterIcon}`}><FaTwitter /></a>
                <a href="https://www.twitch.tv/tamuesports" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.twitchIcon}`}><FaTwitch /></a>
                <a href="https://www.facebook.com/TAMUEsports/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.facebookIcon}`}><FaFacebook /></a>
                <a href="https://www.tiktok.com/@tamuesports" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.tiktokIcon}`}><FaTiktok /></a>
                <a href="https://www.linkedin.com/company/tamu-esports" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.linkedInIcon}`}><FaLinkedin /></a>
            </div>
            <div className={styles.legalContainer}>
                <a href="/">Terms of Use</a> | <a href="/">Privacy Policy</a>
                <p>&copy; 2023 Texas A&M University Esports. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
