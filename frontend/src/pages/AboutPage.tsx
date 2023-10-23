import React, { useEffect, useState } from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import styles from './AboutPage.module.css';
import '../styles/MaroonAccordion.css';
import InViewMotionDiv from '../components/InViewMotionDiv';
import tamuLogo from '../assets/brand/maroon_logo.webp';

const leadershipCards = [
    {
        name: "Alex DeLape",
        position: "President",
        imageUrl: tamuLogo
    },
    {
        name: "Pierce Ray",
        position: "Vice President",
        imageUrl: tamuLogo
    },
    {
        name: "Naomi Kim",
        position: "VP Competitive",
        imageUrl: tamuLogo
    },
    {
        name: "Sreya Suresh",
        position: "VP Operations",
        imageUrl: tamuLogo
    },
    {
        name: "Jason Owen",
        position: "Director of Finance",
        imageUrl: tamuLogo
    },
    {
        name: "Sreya Suresh",
        position: "Director of Social Media",
        imageUrl: tamuLogo
    },
    {
        name: "Daniel Guajardo",
        position: "Director of Content Management",
        imageUrl: tamuLogo
    },
    {
        name: "Sebastian Cerro",
        position: "Director of Event Management",
        imageUrl: tamuLogo
    },
    {
        name: "Alan DeMartini",
        position: "Director of HR",
        imageUrl: tamuLogo
    },
    {
        name: "Faith Lass",
        position: "Director of Secretary",
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
                        <p>Texas A&M Esports is the hub for gaming and Esports enthusiasts at Texas A&M, uniting 2000+ students, alumni, and fans. 
                            We provide an active community for competitive and casual gamers to connect, socialize, and stay informed about the latest AME news. 
                            Whether you're a seasoned pro, an occasional gamer, or simply someone who revels in the thrill of the Esports world, rest assured that Texas A&M Esports has a welcoming space reserved just for you. We extend a warm invitation to join us in celebrating the exhilarating universe of gaming and Esports right here at Texas A&M University!
                            If you are interested in representing A&M in the Collegiate scene, keep an eye out for tryout announcements every semester! 
                            Join us and experience the vibrant Texas A&M Esports community!
                        </p>
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
                                    <Card.Text>Our mission is to foster a vibrant community where competitive gamers and casual players can converge, form lasting bonds, enjoy lively social interactions, and stay up-to-date with the latest AME news. 
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className={styles.missionVisionCards}>
                                <Card.Body>
                                    <Card.Title>Vision</Card.Title>
                                    <Card.Text>As a testament to our commitment to excellence, we proudly support an impressive array of 16 gaming titles and over 30 dedicated teams participating in their respective Collegiate leagues. Our diverse gaming portfolio offers a thrilling platform for gamers from all walks of life to showcase their skills and passion.</Card.Text>
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
                        <div className={styles.eventsTypeList}>
                            <p>At Texas A&M Esports, we offer numerous opportunities for both players and community members to connect and engage in various activities. Over the past year, we've hosted general meetings, virtual and in-person watch parties for major gaming events, and social gatherings in collaboration with other student organizations. We've also organized profit-sharing events at local restaurants, philanthropic initiatives, and community game nights within our Discord community. During mid-terms and finals seasons, we've been there for our members with dedicated study sessions.

But our commitment to community engagement extends beyond gaming. We've actively participated in "The Big Event," the nation's largest one-day, student-run service project hosted by Texas A&M, with community members and players coming together in support of Bryan and College Station residents. Additionally, our "Kyle Field Picture Day" provided a visual testament to the size and vibrancy of our competitive community. And don't miss our watch parties for gaming events, such as the LCS and VCT Finals, where over 100 members gather in a large room, enjoy cans of Red Bull, create banners to support their favorite teams, and discuss their predictions for the game.

Looking ahead, we're excited to continue fostering these connections through more team mixers and the introduction of our mini-facility, which boasts 10 PCs exclusively for A&M Esports members. These enhancements will provide intimate settings for small-scale LAN events.</p>
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
        </>
    );
};

export default AboutPage;
