import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import questions from './quiz1.json';

const QuizDialog1 = ({ open, onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null); // Reset selected answer when moving to the next question
        setCorrectAnswerIndex(null); // Reset correct answer index
    }, [currentQuestionIndex]);

    const handleAnswerClick = (answer, index) => {
        const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;
        setSelectedAnswer({ answer, isCorrect });
        if (isCorrect) {
            setCorrectAnswers(prevCount => prevCount + 1);
        } else {
            setCorrectAnswerIndex(questions[currentQuestionIndex].answers.indexOf(questions[currentQuestionIndex].correctAnswer));
        }
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, 1000);
        } else {
            setShowResult(true);
        }
    };

    const handleDialogClose = () => {
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setShowResult(false);
        onClose();
    };

    const getMessage = () => {
        const totalQuestions = questions.length;
        const message = `You scored ${correctAnswers} out of ${totalQuestions}`;
        if (correctAnswers >= 0 && correctAnswers <= 3) {
            return `${message}\nOh :( Better luck next time`;
        } else if (correctAnswers >= 4 && correctAnswers <= 7) {
            return `${message}\nA for effort! :)`;
        } else if (correctAnswers >= 8 && correctAnswers <= 11) {
            return `${message}\nCongratulations !!`;
        }
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style: { width: 550, height: 400 } }}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Kahoot Quiz #1
                <CloseIcon onClick={handleDialogClose} style={{ cursor: 'pointer' }} />
            </DialogTitle>
            {showResult ? (
                <>
                    <DialogContent>
                        <p>{getMessage()}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} style={{ width: '90%' }}>Close</Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <LinearProgress variant="determinate" value={(currentQuestionIndex + 1) / questions.length * 100} />
                    <DialogContent>
                        <div>
                            <img src={questions[currentQuestionIndex].photoURL} alt={`Question ${currentQuestionIndex + 1}`} />
                            <p>{questions[currentQuestionIndex].question}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <Button
                                        key={index}
                                        variant="contained"
                                        onClick={() => handleAnswerClick(answer, index)}
                                        style={{
                                            textTransform: 'none',
                                            width: '70%',
                                            marginBottom: '8px',
                                            backgroundColor: selectedAnswer && selectedAnswer.answer === answer ?
                                                (selectedAnswer.isCorrect ? 'green' : 'red') :
                                                (correctAnswerIndex === index ? 'green' : '')
                                        }}
                                    >
                                        {answer}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
};

export default QuizDialog1;
