import './QuizCard.css';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Button } from '@mui/material';
import React from 'react';

const QuizCard = ({ image, title, description, onClick }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-img-container">
        <img src={image} alt="quiz-img" className="quiz-img" />
      </div>
      <div className="button-container">
        <Button variant="contained" className="quiz-button" onClick={onClick}>
          <PlayArrowRoundedIcon sx={{ color: 'black', fontSize: '30px' }} />
        </Button>
      </div>
      <div className="quiz-title">
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>
    </div>
  );
};

export default QuizCard;
