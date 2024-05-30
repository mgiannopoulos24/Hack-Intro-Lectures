import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import questions from './quiz6.json';
import './QuizDialog.css';
import images from "./images";

const QuizDialog6 = ({ open, onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);

    useEffect(() => {
        setSelectedAnswer(null); 
        setCorrectAnswerIndexes([]); 
    }, [currentQuestionIndex]);

    const handleAnswerClick = (answer, index) => {
        const correctAnswersArray = Array.isArray(questions[currentQuestionIndex].correctAnswer)
            ? questions[currentQuestionIndex].correctAnswer
            : [questions[currentQuestionIndex].correctAnswer];
        const isCorrect = correctAnswersArray.includes(answer);
        setSelectedAnswer({ answer, isCorrect });
        if (isCorrect) {
            setCorrectAnswers(prevCount => prevCount + 1);
        } else {
            const correctIndexes = correctAnswersArray.map(correctAnswer => 
                questions[currentQuestionIndex].answers.indexOf(correctAnswer)
            );
            setCorrectAnswerIndexes(correctIndexes);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, 2000);
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
            return (
                <>
                    <p id='upper'>{message}</p>
                    <p id='lower'>Oh 🙁 Better luck next time</p>
                </>
            );
        } else if (correctAnswers >= 4 && correctAnswers <= 7) {
            return (
                <>
                    <p id='upper'>{message}</p>
                    <p id='lower'>A for effort! 🙂</p>
                </>
            );
        } else if (correctAnswers >= 8 && correctAnswers <= 11) {
            return (
                <>
                    <p id='upper'>{message}</p>
                    <p id='lower'>Congratulations!!🎉</p>
                </>
            );
        }
    };

    return (
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style: { width: "80%", height: "60%" }}}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                Hashes and more
                <CloseIcon onClick={handleDialogClose} style={{ cursor: 'pointer' }} />
            </DialogTitle>
            {showResult ? (
                <>
                    <DialogContent id="content">
                        <p>{getMessage()}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleDialogClose} sx={{ fontWeight: "bold", textTransform: "none" }}>Πίσω</Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <LinearProgress variant="determinate" value={(currentQuestionIndex + 1) / questions.length * 100} />
                    <DialogContent>
                        <div>
                            <div className="question-img">
                                <img src={images[questions[currentQuestionIndex].photoURL]} alt={`Question ${currentQuestionIndex + 1}`} />
                            </div>
                            <p id="qtext">{questions[currentQuestionIndex].question}</p>
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
                                                (correctAnswerIndexes.includes(index) ? 'green' : '')
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

export default QuizDialog6;
