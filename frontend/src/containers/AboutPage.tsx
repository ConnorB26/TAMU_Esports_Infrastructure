import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Container } from 'react-bootstrap';
import styles from './AboutPage.module.css';
import '../styles/MaroonAccordion.css';
import InViewMotionDiv from '../components/InViewMotionDiv';
import tamuLogo from '../assets/brand/maroon_logo.webp';

const leadershipCards = [
    {
        name: "Leader Name 1",
        position: "Position 1",
        imageUrl: tamuLogo
    },
    {
        name: "Leader Name 2",
        position: "Position 2",
        imageUrl: tamuLogo
    },
];

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
                <section className="py-5">
                    <Container className="text-center">
                        <h1>Introduction</h1>
                        <p>Our organization is ...</p>
                    </Container>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.15 } }
            }}>
                <section className={`${styles.lightGreyBackground} py-5`}>
                    <Container className="text-center">
                        <h2>Mission & Vision</h2>
                        <Container className="d-flex justify-content-around flex-wrap mt-4">
                            <Card className={styles.missionVisionCards}>
                                <Card.Body>
                                    <Card.Title>Mission</Card.Title>
                                    <Card.Text>Our mission is to ...</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className={styles.missionVisionCards}>
                                <Card.Body>
                                    <Card.Title>Vision</Card.Title>
                                    <Card.Text>Our vision is to ...</Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Container>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.225 } }
            }}>
                <section className={`${styles.maroonBackground} py-5`}>
                    <Container className="text-center">
                        <h2 className="text-white">Leadership</h2>
                        <Container className="d-flex justify-content-center flex-wrap mt-4">
                            {leadershipCards.map((leader, index) => (
                                <Card className={`m-3 ${styles.leadershipCard}`} key={index}>
                                    <Card.Img variant="top" src={leader.imageUrl} />
                                    <Card.Body>
                                        <Card.Title>{leader.name}</Card.Title>
                                        <Card.Text>{leader.position}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Container>
                    </Container>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
            }}>
                <section className={`${styles.lightGreyBackground} py-5`}>
                    <Container className="text-center">
                        <h2>Events & Activities</h2>
                        <div className={styles.timeline}>
                            <p>Event 1: Gaming Tournament</p>
                            <p>Event 2: Charity Stream</p>
                            <p>Event 3: Community Outreach</p>
                        </div>
                    </Container>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.375 } }
            }}>
                <section className={`${styles.maroonBackground} py-5`}>
                    <Container className="text-center">
                        <h2 className="text-white">Frequently Asked Questions</h2>
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
                    </Container>
                </section>
            </InViewMotionDiv>

            <InViewMotionDiv variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.45 } }
            }}>
                <section className={`${styles.lightGreyBackground} py-5`}>
                    <Container className="text-center">
                        <h2>Get Involved</h2>
                        <Button className="mt-3" variant="primary">Join Us</Button>
                    </Container>
                </section>
            </InViewMotionDiv>
        </>
    );
};

export default AboutPage;
