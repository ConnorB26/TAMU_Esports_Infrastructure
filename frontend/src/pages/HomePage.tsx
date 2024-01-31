import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.css';
import banner from '../assets/brand/banner_small.webp'
import tsmuLogo from '../assets/partners/tsmu.webp';
import hyperxLogo from '../assets/partners/hyperx.webp';
import uconnectLogo from '../assets/partners/uconnect.webp';
import gengLogo from '../assets/partners/geng.webp';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Col, Image, Row } from 'react-bootstrap';
import InViewMotionDiv from '../components/InViewMotionDiv';
import { getSocialLinks } from '../components/SocialLinks';

const partnerships = [
    { name: 'TSM University', image: tsmuLogo, url: 'https://twitter.com/tsmuniversity?lang=en' },
    { name: 'Hyper X', image: hyperxLogo, url: 'https://hyperx.com/' },
    { name: 'Uconnect', image: uconnectLogo, url: 'https://www.uconnect.app/' },
    { name: 'Gen.G Esports', image: gengLogo, url: 'https://geng.gg/' }
];

const HomePage: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <Image src={banner} onLoad={() => setImageLoaded(true)} fluid className={imageLoaded ? '' : styles.hidden} />
            {!imageLoaded && <div className={styles.bannerPlaceholder} />}

            <div className={styles.bannerSpacer} />

            <Container fluid className={`py-4 ${styles.followUsWrapper}`}>
                <Container>
                    <Row className="justify-content-around">
                        <Col md={6} sm={12} className="text-center mb-4">
                            <InViewMotionDiv variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: 0.5 } }
                            }}>
                                <h1 className="text-primary">Follow Us</h1>
                            </InViewMotionDiv>
                            <Container fluid className={styles.socialList}>
                                {getSocialLinks(true).map((link, index) => (
                                    <InViewMotionDiv key={index} variants={{
                                        hidden: { opacity: 0, x: -50 },
                                        visible: { opacity: 1, x: 0, transition: { delay: 0.1 * (index + 1), duration: 0.5 } }
                                    }}>
                                        {link}
                                    </InViewMotionDiv>
                                ))}
                            </Container>
                        </Col>

                        <InViewMotionDiv className={`col-md-6 col-sm-12 ${styles.twitterColumn}`} variants={{
                            hidden: { opacity: 0, x: 200 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.5 } }
                        }}>
                            <TwitterTimelineEmbed sourceType="profile" screenName="tamuesports" autoHeight />
                        </InViewMotionDiv>
                    </Row>
                </Container>
            </Container>

            <Container className="py-5">
                <InViewMotionDiv variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5 } }
                }}>
                    <h1 className="text-primary">Partners</h1>
                </InViewMotionDiv>
                <Container fluid className="d-flex justify-content-around flex-wrap">
                    {partnerships.map((partner, index) => (
                        <InViewMotionDiv key={index} variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.2 * (index + 1), duration: 0.5 } }
                        }}
                            className={`${styles.partnerDiv} my-1`}
                        >
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.partnerLink}
                            >
                                <Image src={partner.image} alt={partner.name} fluid />
                            </a>
                        </InViewMotionDiv>
                    ))}
                </Container>
            </Container>
        </>
    );
};


export default HomePage;