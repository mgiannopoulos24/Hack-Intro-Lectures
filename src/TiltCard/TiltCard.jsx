import React from 'react';
import { Tilt } from 'react-tilt';
import "./TiltCard.css";

const defaultOptions = {
  reverse: false,
  max: 15, // Decreased max value for less tilt
  perspective: 1500 // Adjusted perspective value
};

const TiltCard = ({ image, title, description }) => {
  return (
    <Tilt options={defaultOptions}>
      <div className="tilt-card">
        <div className="tilt-img-container">
          <img src={image} alt="wg-img" className="tilt-img" />
        </div>
        <div className="tilt-title">
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
      </div>
    </Tilt>
  );
};

export default TiltCard;
