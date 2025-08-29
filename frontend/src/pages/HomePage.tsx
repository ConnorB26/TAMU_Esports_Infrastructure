import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.css';
import banner from '../assets/brand/banner_small.webp';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Col, Image, Row } from 'react-bootstrap';
import InViewMotionDiv from '../components/InViewMotionDiv';
import { getSocialLinks } from '../components/SocialLinks';

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
        </>
    );
};

export default HomePage;
