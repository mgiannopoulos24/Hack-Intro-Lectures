import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './CustomCard.css'; // Import your CSS file

const CustomCard = ({ title, paper, slides, part1, part2 }) => {
    return (
        <Card className="custom-card">
            <Box className="custom-card-header">
                <Typography variant="h5" component="div" className="custom-card-title">
                    {title}
                </Typography>
            </Box>
            <CardContent className="custom-card-content">
                <Button variant="contained" href={paper} className="custom-button">
                    Προτεινόμενο Paper
                </Button>
                <Button variant="contained" href={slides} className="custom-button">
                    Διαφάνειες
                </Button>
                <Box display="flex" justifyContent="space-between" sx={{ gap: '3px' }}>
                    <Button variant="contained" href={part1} className="custom-button custom-half-width-button">
                        Διάλεξη Μέρος 1
                    </Button>
                    <Button variant="contained" href={part2} className="custom-button custom-half-width-button">
                        Διάλεξη Μέρος 2
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
