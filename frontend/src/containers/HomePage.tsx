import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './HomePage.module.css';

import banner from '../assets/brand/banner_small.webp'
import tamuLogo from '../assets/brand/maroon_logo.webp';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitch, FaTwitter } from 'react-icons/fa';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Row } from 'react-bootstrap';

const sponsors = [
    { name: 'Sponsor1', image: tamuLogo, url: 'https://sponsor1.com' },
    { name: 'Sponsor2', image: tamuLogo, url: 'https://sponsor2.com' },
    { name: 'Sponsor3', image: tamuLogo, url: 'https://sponsor3.com' },
    { name: 'Sponsor4', image: tamuLogo, url: 'https://sponsor4.com' },
    { name: 'Sponsor5', image: tamuLogo, url: 'https://sponsor5.com' },
    { name: 'Sponsor6', image: tamuLogo, url: 'https://sponsor6.com' },
];

const partnerships = [
    { name: 'Partner1', image: tamuLogo, url: 'https://partner1.com' },
    { name: 'Partner2', image: tamuLogo, url: 'https://partner2.com' },
    { name: 'Partner3', image: tamuLogo, url: 'https://partner3.com' },
    { name: 'Partner4', image: tamuLogo, url: 'https://partner4.com' },
    { name: 'Partner5', image: tamuLogo, url: 'https://partner5.com' },
    { name: 'Partner6', image: tamuLogo, url: 'https://partner6.com' },
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
    const controlsSponsors = useAnimation();
    const controlsPartners = useAnimation();
    const controlsSocialIcons = useAnimation();
    const controlsTwitter = useAnimation();
    const [refSponsors, inViewSponsors] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });
    const [refPartners, inViewPartners] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });
    const [refSocialIcons, inViewSocialIcons] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });
    const [refTwitter, inViewTwitter] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        if (inViewSponsors) {
            controlsSponsors.start(i => ({
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.1 }
            }));
        }
    }, [controlsSponsors, inViewSponsors]);

    useEffect(() => {
        if (inViewPartners) {
            controlsPartners.start(i => ({
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.1 + ((sponsors.length - 1) * 0.1) }
            }));
        }
    }, [controlsPartners, inViewPartners]);

    useEffect(() => {
        if (inViewSocialIcons) {
            controlsSocialIcons.start(i => ({
                opacity: 1,
                x: 0,
                transition: { delay: i * 0.1 }
            }));
        }
    }, [controlsSocialIcons, inViewSocialIcons]);

    useEffect(() => {
        if (inViewTwitter) {
            controlsTwitter.start({
                x: 0,
                opacity: 1,
                transition: { delay: .25 }
            });
        }
    }, [controlsTwitter, inViewTwitter]);

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
                        <motion.div className={`col-md-6 col-sm-12 ${styles.socialsColumn}`} ref={refSocialIcons}>
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Follow Us
                            </motion.h1>
                            <motion.div className={styles.socialList} ref={refSocialIcons}>
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        href={link.url}
                                        key={index}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.socialIcon} ${link.className}`}
                                        custom={index}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={controlsSocialIcons}
                                    >
                                        <link.Icon />{link.name}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div className={`col-md-6 col-sm-12 ${styles.twitterColumn}`} ref={refTwitter} initial={{ x: 200, opacity: 0 }} animate={controlsTwitter}>
                            <TwitterTimelineEmbed sourceType="profile" screenName="tamuesports" autoHeight />
                        </motion.div>
                    </Row>
                </Container>
            </div>

            <Container className={styles.sponsorsPartnersContainer}>
                <motion.div ref={refSponsors}>
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
                        Sponsors
                    </motion.h1>
                    <div className={styles.sponsorContainer}>
                        {sponsors.map((sponsor, index) => (
                            <motion.a
                                href={sponsor.url}
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                                custom={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={controlsSponsors}
                            >
                                <img src={sponsor.image} alt={sponsor.name} />
                                <p>{sponsor.name}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <div className={styles.sponsorsPartnersSpacer} />

                <motion.div ref={refPartners}>
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: sponsors.length * 0.1 } }}>
                        Partners
                    </motion.h1>
                    <div className={styles.partnerContainer}>
                        {partnerships.map((partner, index) => (
                            <motion.a
                                href={partner.url}
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                                custom={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={controlsPartners}
                            >
                                <img src={partner.image} alt={partner.name} />
                                <p>{partner.name}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </>
    );
};


export default HomePage;