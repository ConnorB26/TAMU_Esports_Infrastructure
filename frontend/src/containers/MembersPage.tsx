import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './MembersPage.module.css';
import ScrollLink from '../components/ScrollLink';
import InViewMotionDiv from '../components/InViewMotionDiv';

const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const generateCardVariants = (index: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1 * index, duration: 0.3 } }
});

const MembersPage: React.FC = () => {
    return (
        <Container fluid className="py-5">
            <InViewMotionDiv variants={headerVariants}>
                <Container className="text-center mb-5">
                    <h1>Members Hub</h1>
                    <p>All the essentials for our members - from upcoming events to membership benefits.</p>
                </Container>
            </InViewMotionDiv>

            <Container className="mb-5">
                <InViewMotionDiv variants={generateCardVariants(0)}>
                    <h2 className="text-center mb-4">Membership Dues</h2>
                </InViewMotionDiv>
                <Row className="flex-column">
                    <Col md={12} className="mb-4">
                        <InViewMotionDiv variants={generateCardVariants(1)}>
                            <Card className={styles.duesCard}>
                                <Card.Body>
                                    <Card.Title className={styles.cardTitle}>Who</Card.Title>
                                    <Card.Text>Anyone who will compete on a Texas A&M Esports roster, participate in Texas A&M Esports events, or work in any of the organization's competitive or administrative teams.</Card.Text>
                                </Card.Body>
                            </Card>
                        </InViewMotionDiv>
                    </Col>
                    <Col md={12} className="mb-4">
                        <InViewMotionDiv variants={generateCardVariants(2)}>
                            <Card className={styles.duesCard}>
                                <Card.Body>
                                    <Card.Title className={styles.cardTitle}>What</Card.Title>
                                    <Card.Text>Dues will primarily be spent on two main items: the first being teams' collegiate/competitive league entry fees, the second being funding for events Texas A&M Esports will host, including watch parties, LANs, prizes for hosted tournaments, and more.</Card.Text>
                                </Card.Body>
                            </Card>
                        </InViewMotionDiv>
                    </Col>
                    <Col md={12} className="mb-4">
                        <InViewMotionDiv variants={generateCardVariants(3)}>
                            <Card className={styles.duesCard}>
                                <Card.Body>
                                    <Card.Title className={styles.cardTitle}>Benefits</Card.Title>
                                    <Card.Text>
                                        Being a member of Texas A&M Esports will grant you many perks. Unless stated otherwise, all members gain free entry and free concessions (food and beverages) at all Texas A&M Esports events.
                                        <br /><br />
                                        More than that, membership grants priority in event registration: if an event is in high demand but has limited availability, member reservations are prioritized over non-member reservations.
                                        <br /><br />
                                        Do you see yourself working in Esports in the future? Members gain exclusive access to our partnership programs, through which we can host career-focused discussions with Esports industry leaders, resume reviews, and other career preparatory events.
                                        <br /><br />
                                        All members will receive the “Member” role in our Discord server, giving access to special Members-Only social channels. Want to grow your online presence, gain views, show off your work, or even make new friends? AME Membership will also grant access to the coveted Self-Promotion channel, the perfect place to develop your personal (and professional!) network among fellow Aggies. Competitive members (those who play for teams) will receive free entry into all collegiate leagues. AME will also cover any entry fees into competitive tournaments. Players will also gain access to full representation and promotion by AME through our official channels, including streamed matches, social media promotion across all platforms, etc.
                                        <br /><br />
                                        Everyone (competitive and casual members alike) can reserve a PC in the Interim Esports Facility. Still, competitive teams will always have priority reservations in the spirit of allowing our collegiate teams and players to excel.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </InViewMotionDiv>
                    </Col>
                </Row>
            </Container>

            <InViewMotionDiv variants={headerVariants}>
                <Container className="text-center">
                    <p>Have questions about dues or events? <ScrollLink to="/contact">Contact us!</ScrollLink></p>
                </Container>
            </InViewMotionDiv>
        </Container>
    );
};

export default MembersPage;
