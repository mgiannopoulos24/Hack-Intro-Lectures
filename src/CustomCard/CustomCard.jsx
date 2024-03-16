import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './CustomCard.css';


const buttonStyles = {
    width: '100%', 
    color: 'black',
    marginBottom: '8px', 
    textTransform: 'none', 
    backgroundColor: '#b5e853', 
    fontFamily: 'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
    '&:hover': {
      backgroundColor: '#9cb82c', // A darker shade of the button color for hover effect
    },
  };


const CustomCard = ({ title, paper, slides, part1, part2 }) => {
    return (
        <Card className="custom-card" sx={{ maxWidth: 345, borderRadius: '5px',borderColor:"gray" }}>
            <Box sx={{ backgroundColor: '#b5e853', color: 'black', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height:'60px'}}>
                <Typography variant="h5" component="div" sx={{ fontFamily: 'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace' }}>
                    {title}
                </Typography>
            </Box>
            <CardContent sx={{ backgroundColor: '#1A1A1A', paddingBottom: '16px!important' }}>
                <Button variant="contained" href={paper} sx={buttonStyles}>Προτεινόμενο Paper</Button>
                <Button variant="contained" href={slides} sx={buttonStyles}>Διαφάνειες</Button>
                <Box display="flex" justifyContent="space-between" sx={{ gap: '3px' }}>
                    <Button variant="contained" href={part1} sx={{ ...buttonStyles, width: '50%' }}>Διάλεξη Μέρος 1</Button>
                    <Button variant="contained" href={part2} sx={{ ...buttonStyles, width: '50%' }}>Διάλεξη Μέρος 2</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
