import React from 'react';
import { Link } from 'react-router-dom';

const ScrollLink: React.FC<any> = (props) => {
    const handleClick = () => {
        window.scrollTo(0, 0); 
    };

    return <Link {...props} onClick={handleClick} />;
};

export default ScrollLink;
