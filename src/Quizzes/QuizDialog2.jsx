import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const QuizDialog2 = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Kahoot Quiz #2</DialogTitle>
        <DialogContent>
            Soon...
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
);

export default QuizDialog2;
