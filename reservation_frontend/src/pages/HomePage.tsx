import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FacilityAPI from '../services/facilityService';
import { Facility } from '../models/Facility';
import FacilityCard from '../components/FacilityCard';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        FacilityAPI.findAll().then(setFacilities);
    }, []);

    return (
        <Container fluid className="pt-4">
            <Row className={styles.introSection}>
                <Col>
                    <h1 className={styles.introTitle}>Welcome to the Reservation System</h1>
                    <p className={styles.introText}>
                        This system allows you to view available facilities and make reservations for your events. Explore our facilities and book your spot today!
                    </p>
                </Col>
            </Row>

            <Row xs={1} md={2} className="g-4">
                {facilities.map((facility, idx) => (
                    <Col key={idx}>
                        <FacilityCard facility={facility} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
