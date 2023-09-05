import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import InViewMotionDiv from '../components/InViewMotionDiv';
import styles from './ContactPage.module.css';

const contactCards = [
    {
        name: "President",
        email: "president@tamuesports.com",
        description: "General questions about the organization"
    },
    {
        name: "Vice President",
        email: "vice-president@tamuesports.com",
        description: "General questions about the organization"
    },
];

const ContactPage: React.FC = () => {
    return (
        <Container fluid className={`${styles.wrapper} py-5`}>
            <Container>
                <InViewMotionDiv variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                    <Row className="justify-content-center mb-5">
                        <Col md={8} className="text-center">
                            <h2>Get in Touch</h2>
                            <p>Have questions or feedback? Reach out to the appropriate team member below or use our contact form.</p>
                        </Col>
                    </Row>
                </InViewMotionDiv>

                <Row className="mb-5 justify-content-center">
                    {contactCards.map((contact, index) => (
                        <Col md={4} key={index}>
                            <InViewMotionDiv variants={{ hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { delay: 0.15 + (0.2 * index), duration: 0.5 } } }}>
                                <Card className={`mb-4 shadow-sm h-100 ${styles.card}`}>
                                    <Card.Body className="text-center">
                                        <Card.Title>{contact.name}</Card.Title>
                                        <Card.Text>
                                            <a href={`mailto:${contact.email}`} className={`text-primary ${styles.cardLink}`}>{contact.email}</a>
                                            <br />
                                            {contact.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </InViewMotionDiv>
                        </Col>
                    ))}
                </Row>

                <InViewMotionDiv variants={{ hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } } }}>
                    <Row className="justify-content-center mb-5">
                        <Col md={6} className="p-4 bg-white rounded shadow-sm">
                            <h3 className="text-center mb-4">Contact Form</h3>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Enter subject" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Select>
                                        {contactCards.map((contact, index) => (
                                            <option key={index}>{contact.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </InViewMotionDiv>

                <InViewMotionDiv variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.45, duration: 0.5 } } }}>
                    <Row className="mt-5 justify-content-center">
                        <Col md={8} className="text-center">
                            <p className="text-muted">We appreciate all feedback and inquiries. However, the response time might vary depending on the volume of messages.</p>
                        </Col>
                    </Row>
                </InViewMotionDiv>
            </Container>
        </Container>
    );
};

export default ContactPage;
