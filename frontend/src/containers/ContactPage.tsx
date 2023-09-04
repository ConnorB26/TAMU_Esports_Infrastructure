import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import styles from './ContactPage.module.css';
import InViewMotionDiv from '../components/InViewMotionDiv';

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
    // Add other cards as needed
];

const ContactPage: React.FC = () => {
    return (
        <div className={`${styles.pageWrapper} py-5 w-100`}>
            <Container>
                <InViewMotionDiv variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}>
                    <Row className="justify-content-center mb-5">
                        <Col md={8} className="text-center">
                            <h2>Get in Touch</h2>
                            <p>Have questions or feedback? Reach out to the appropriate team member below or use our contact form.</p>
                        </Col>
                    </Row>
                </InViewMotionDiv>

                <Row className="mb-5 justify-content-center">
                    {contactCards.map((contact, index) => (
                        <Col md={4}>
                            <InViewMotionDiv key={index} variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: { opacity: 1, x: 0, transition: { delay: 0.15 + (0.2 * index), duration: 0.5 } }
                            }}>
                                <Card className={`mb-4 ${styles.card}`}>
                                    <Card.Body>
                                        <Card.Title>{contact.name}</Card.Title>
                                        <Card.Text>
                                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                            <br />
                                            {contact.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </InViewMotionDiv>
                        </Col>
                    ))}
                </Row>

                <InViewMotionDiv variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } }
                }}>
                    <Row className="justify-content-center mb-5">
                        <Col md={6} className={`${styles.formBackground}`}>
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

                <InViewMotionDiv variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { delay: 0.45, duration: 0.5 } }
                }}>
                    <Row className="mt-5 justify-content-center">
                        <Col md={8} className="text-center">
                            <p className={`text-muted ${styles.footerNote}`}>
                                We appreciate all feedback and inquiries. However, the response time might vary depending on the volume of messages.
                            </p>
                        </Col>
                    </Row>
                </InViewMotionDiv>

            </Container>
        </div>
    );
};

export default ContactPage;
