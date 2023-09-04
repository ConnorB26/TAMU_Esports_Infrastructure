import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './AboutPage.module.css';
import '../styles/MaroonAccordion.css';
import InViewMotionDiv from '../components/InViewMotionDiv';

const AboutPage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string | null>("");

    useEffect(() => {
        setActiveKey("");
    }, []);

    return (
        <>
            <InViewMotionDiv variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.075 } }
            }}>
                <section className={styles.introductionSection}>
                    <h1>Introduction</h1>
                    <p>Our organization is ...</p>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.15 } }
            }}>
                <section className={styles.missionVisionSection}>
                    <h2>Mission & Vision</h2>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h3>Mission</h3>
                            <p>Our mission is to ...</p>
                        </div>
                        <div className={styles.card}>
                            <h3>Vision</h3>
                            <p>Our vision is to ...</p>
                        </div>
                    </div>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.225 } }
            }}>
                <section className={styles.leadershipSection}>
                    <h2>Leadership</h2>
                    <div className={styles.leadershipGrid}>
                        <div className={styles.profileCard}>
                            <img src="profile_image_url_here" alt="Leader Pic" />
                            <h4>Leader Name</h4>
                            <p>Position</p>
                        </div>
                        <div className={styles.profileCard}>
                            <img src="profile_image_url_here" alt="Leader Pic" />
                            <h4>Leader Name</h4>
                            <p>Position</p>
                        </div>
                    </div>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
            }}>
                <section className={styles.eventsSection}>
                    <h2>Events & Activities</h2>
                    <div className={styles.timeline}>
                        <p>Event 1: Gaming Tournament</p>
                        <p>Event 2: Charity Stream</p>
                        <p>Event 3: Community Outreach</p>
                    </div>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.375 } }
            }}>
                <section className={styles.faqSection}>
                    <h2>Frequently Asked Questions</h2>
                    <Accordion activeKey={activeKey} onSelect={(key: any) => setActiveKey(key)} flush>
                        <Accordion.Item eventKey="0" className={styles.faqAccordion}>
                            <Accordion.Header>Q: How do I join?</Accordion.Header>
                            <Accordion.Body>
                                A: You can join by ...
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className={styles.faqAccordion}>
                            <Accordion.Header>Q: Are there membership fees?</Accordion.Header>
                            <Accordion.Body>
                                A: Yes, the fee is ...
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.45 } }
            }}>
                <section className={styles.getInvolvedSection}>
                    <h2>Get Involved</h2>
                    <button className={styles.joinButton}>Join Us</button>
                </section>
            </InViewMotionDiv>
        </>
    );
};

export default AboutPage;
