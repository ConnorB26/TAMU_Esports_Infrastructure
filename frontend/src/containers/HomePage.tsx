import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.css';
import banner from '../assets/brand/banner.png'

import tamuLogo from '../assets/brand/maroon_logo.webp';
const sponsors = [
    { name: 'Sponsor1', image: tamuLogo, url: 'https://sponsor1.com' },
    { name: 'Sponsor2', image: tamuLogo, url: 'https://sponsor2.com' },
    { name: 'Sponsor3', image: tamuLogo, url: 'https://sponsor3.com' },
    { name: 'Sponsor4', image: tamuLogo, url: 'https://sponsor4.com' },
    { name: 'Sponsor5', image: tamuLogo, url: 'https://sponsor5.com' },
    { name: 'Sponsor6', image: tamuLogo, url: 'https://sponsor6.com' },
];

const partnerships = [
    { name: 'Partner1', image: tamuLogo, url: 'https://partner1.com' },
    { name: 'Partner2', image: tamuLogo, url: 'https://partner2.com' },
    { name: 'Partner3', image: tamuLogo, url: 'https://partner3.com' },
    { name: 'Partner4', image: tamuLogo, url: 'https://partner4.com' },
    { name: 'Partner5', image: tamuLogo, url: 'https://partner5.com' },
    { name: 'Partner6', image: tamuLogo, url: 'https://partner6.com' },
];

const HomePage: React.FC = () => {
    return (
        <>
            <img src={banner} className='w-100' alt='' />
            <div className={styles.bannerSpacer}></div>
            <Container className={styles.sponsorsPartnersContainer}>
                <h1>Sponsors</h1>
                <div className={styles.sponsorContainer}>
                    {sponsors.map((sponsor, index) => (
                        <a href={sponsor.url} key={index} target="_blank" rel="noopener noreferrer">
                            <img src={sponsor.image} alt={sponsor.name} />
                            <p>{sponsor.name}</p>
                        </a>
                    ))}
                </div>
                <div className={styles.sponsorsPartnersSpacer} />
                <h1>Partners</h1>
                <div className={styles.partnerContainer}>
                    {partnerships.map((partner, index) => (
                        <a href={partner.url} key={index} target="_blank" rel="noopener noreferrer">
                            <img src={partner.image} alt={partner.name} />
                            <p>{partner.name}</p>
                        </a>
                    ))}
                </div>
            </Container>
        </>
    );
};


export default HomePage;