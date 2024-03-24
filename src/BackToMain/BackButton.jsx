import React from 'react';
import Button from '@mui/material/Button';
import './BackButton.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link to="/" className="back-link">
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none',backgroundColor: '#b5e853', color: 'black',fontWeight:'bold'}}
        className="back-button"
      >
      <ArrowBackIosIcon sx={{color:'black',fontSize:'small'}}/>
        Διαλέξεις
      </Button>
    </Link>
  );
};

export default BackButton;
