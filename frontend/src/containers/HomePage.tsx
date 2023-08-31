import React from 'react';
import { Carousel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.css';

const imageContext = (require as any).context('../assets/carousel', false, /\.webp$/);

const HomePage: React.FC = () => {
    const carouselItems = imageContext.keys().map((filename: string, index: number) => {
        const imgSrc = imageContext(filename);
        const altText = filename.replace('./', '').replace('.webp', '');
        return (
            <Carousel.Item key={index}>
                <img
                    className={`d-block w-100 ${styles.carouselImage}`}
                    src={imgSrc.default || imgSrc}
                    alt={altText}
                />
            </Carousel.Item>
        );
    });

    return (
        <Container fluid>
            <div className={styles.carouselContainer}>
                <Carousel interval={5000} controls={false}>
                    {carouselItems}
                </Carousel>
                <div className={styles.overlayText}>
                    <div className={styles.welcomeBlock}>
                        <h1 className={`${styles.serif} ${styles.welcomeText}`}>
                            <span className={styles.span}><em>Welcome to</em></span> TEXAS A&amp;M UNIVERSITY ESPORTS
                        </h1>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;