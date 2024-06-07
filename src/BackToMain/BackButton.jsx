import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './BackButton.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const BackButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link to="/" className="back-link">
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: '#b5e853',
          color: 'black',
          borderRadius: isScrolled ? '50%' : '5px', 
          width: isScrolled ? '40px' : 'auto',
          justifyContent: isScrolled ? 'center' : 'flex-start',
          height: isScrolled ? '40px' : 'auto',
          minWidth: isScrolled ? '40px' : 'auto',
          padding: isScrolled ? '0px' : '6px 16px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
        className="back-button"
      >
        {isScrolled ? (
          <ArrowBackIosIcon sx={{ color: 'black', fontSize: 'small', marginLeft: '5%' }} />
        ) : (
          <>
            <ArrowBackIosIcon sx={{ color: 'black', fontSize: 'small' }} />
            Διαλέξεις
          </>
        )}
      </Button>
    </Link>
  );
};

export default BackButton;
