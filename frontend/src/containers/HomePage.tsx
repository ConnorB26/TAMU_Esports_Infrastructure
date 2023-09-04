import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.css';
import banner from '../assets/brand/banner_small.webp'
import tamuLogo from '../assets/brand/maroon_logo.webp';
import hyperxLogo from '../assets/partners/hyperx.webp';
import uconnectLogo from '../assets/partners/uconnect.webp';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitch, FaTwitter } from 'react-icons/fa';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Row } from 'react-bootstrap';
import InViewMotionDiv from '../components/InViewMotionDiv';

const partnerships = [
    { name: 'TSM University', image: tamuLogo, url: 'https://twitter.com/tsmuniversity?lang=en' },
    { name: 'Hyper X', image: hyperxLogo, url: 'https://hyperx.com/' },
    { name: 'Uconnect', image: uconnectLogo, url: 'https://www.uconnect.app/' }
];

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
    { Icon: FaLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/company/tamu-esports', className: styles.linkedInIcon }
];

const HomePage: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <img
                src={banner}
                onLoad={handleImageLoad}
                className={`w-100 ${imageLoaded ? '' : styles.hidden}`}
                alt=""
            />
            {!imageLoaded && (
                <div className={styles.bannerPlaceholder}></div>
            )}

            <div className={styles.bannerSpacer}></div>

            <div className={styles.followUsWrapper}>
                <Container>
                    <Row className={styles.followUsSection}>
                        <div className={`col-md-6 col-sm-12 ${styles.socialsColumn}`}>
                            <InViewMotionDiv variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: 0.5 } }
                            }}>
                                <h1>Follow Us</h1>
                            </InViewMotionDiv>
                            <div className={styles.socialList}>
                                {socialLinks.map((link, index) => (
                                    <InViewMotionDiv
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, x: -50 },
                                            visible: { opacity: 1, x: 0, transition: { delay: 0.1 * (index + 1), duration: 0.5 } }
                                        }}
                                    >
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.socialIcon} ${link.className}`}
                                        >
                                            <link.Icon />{link.name}
                                        </a>
                                    </InViewMotionDiv>
                                ))}
                            </div>
                        </div>

                        <InViewMotionDiv className={`col-md-6 col-sm-12 ${styles.twitterColumn}`} variants={{
                            hidden: { opacity: 0, x: 200 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.5 } }
                        }}>
                            <TwitterTimelineEmbed sourceType="profile" screenName="tamuesports" autoHeight />
                        </InViewMotionDiv>
                    </Row>
                </Container>
            </div>

            <Container className={styles.sponsorsPartnersContainer}>
                <InViewMotionDiv variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5 } }
                }}>
                    <h1>Partners</h1>
                </InViewMotionDiv>
                <div className={styles.partnerContainer}>
                    {partnerships.map((partner, index) => (
                        <InViewMotionDiv
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { delay: 0.2 * (index + 1), duration: 0.5 } }
                            }}
                        >
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={partner.image} alt={partner.name} />
                                {/*<p>{partner.name}</p>*/}
                            </a>
                        </InViewMotionDiv>
                    ))}
                </div>
            </Container>

        </>
    );
};


export default HomePage;