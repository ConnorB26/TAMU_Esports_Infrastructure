import React from 'react';
import styles from './SocialLinks.module.css';
import { FaDiscord, FaInstagram, FaTwitter, FaTwitch, FaFacebook, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface SocialLink {
    Icon: React.ElementType;
    name: string;
    url: string;
    className: string;
}

const socialLinks: SocialLink[] = [
    { Icon: FaDiscord, name: 'Discord', url: 'https://discord.gg/tamuesports', className: styles.discordIcon },
    { Icon: FaInstagram, name: 'Instagram', url: 'https://www.instagram.com/tamuesports/', className: styles.instagramIcon },
    { Icon: FaTwitter, name: 'Twitter', url: 'https://www.twitter.com/tamuesports/', className: styles.twitterIcon },
    { Icon: FaTwitch, name: 'Twitch', url: 'https://www.twitch.tv/tamuesports', className: styles.twitchIcon },
    { Icon: FaFacebook, name: 'Facebook', url: 'https://www.facebook.com/TAMUEsports/', className: styles.facebookIcon },
    { Icon: FaTiktok, name: 'TikTok', url: 'https://www.tiktok.com/@tamuesports', className: styles.tiktokIcon },
    { Icon: FaLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/company/tamu-esports', className: styles.linkedInIcon },
    { Icon: FaYoutube, name: 'YouTube', url: "https://www.youtube.com/@texasamesports2560", className: styles.youtubeIcon }
];

export const getSocialLinks = (label: boolean) => {
    return socialLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${link.className}`}>
            <link.Icon />{label && link.name}
        </a>
    ));
};