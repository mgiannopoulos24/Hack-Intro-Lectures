import React from 'react';
import Button from '@mui/material/Button';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import './GameButton.css';
import { Link } from 'react-router-dom';

const RoundIconButton = () => {
  return (
    <Link to="/Wargames" style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: '50%',
        width: 56,
        height: 56,
        minWidth: 0,
        p: 0,
        backgroundColor: '#b5e853',
      }}
      className="WGButton"
    >
      <SportsEsportsIcon sx={{color:'black'}}/>
    </Button>
    </Link>
  );
};

export default RoundIconButton;
