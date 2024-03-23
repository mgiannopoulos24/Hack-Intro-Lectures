import React from 'react';
import Button from '@mui/material/Button';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import './GameButton.css';

const RoundIconButton = () => {
  return (
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
  );
};

export default RoundIconButton;
