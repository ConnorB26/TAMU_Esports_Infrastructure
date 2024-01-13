import { Card, ListGroup } from "react-bootstrap";
import { Facility } from "../models/Facility";
import styles from './FacilityCard.module.css';

interface FacilityProps {
    facility: Facility;
}

const FacilityCard: React.FC<FacilityProps> = ({ facility }) => {
    return (
        <Card className={styles.cardContainer}>
            <Card.Img variant="top" src={facility.map_image_url || 'placeholder-image-url.jpg'} className={styles.cardImage} />
            <Card.Body>
                <Card.Title className={styles.cardTitle}>{facility.name}</Card.Title>
                <Card.Text className={styles.cardText}>{facility.location}</Card.Text>
            </Card.Body>
            <ListGroup className={'list-group-flush'}>
                <ListGroup.Item className={styles.cardInfoItem}>Hours: {facility.hours}</ListGroup.Item>
                <ListGroup.Item className={styles.cardInfoItem}>PC Specs: {facility.pc_specs}</ListGroup.Item>
                <ListGroup.Item className={styles.cardInfoItem}>
                    Games Available:
                    <div className={styles.cardInfoGames}>
                        {facility.games.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default FacilityCard;
