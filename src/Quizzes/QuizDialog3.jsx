import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import questions from './quiz3.json';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './QuizDialog.css';
import images from "./images";

const QuizDialog3 = ({ open, onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);
    const [userSelections, setUserSelections] = useState([]);

    useEffect(() => {
        if (open) {
            resetQuiz();
        }
    }, [open]);

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setCorrectAnswerIndexes([]);
        setUserSelections([]);
    };

    const handleAnswerClick = (answer, index) => {
        const correctAnswersArray = Array.isArray(questions[currentQuestionIndex].correctAnswer)
            ? questions[currentQuestionIndex].correctAnswer
            : [questions[currentQuestionIndex].correctAnswer];
        const isCorrect = correctAnswersArray.includes(answer);

        const correctIndexes = correctAnswersArray.map(correctAnswer =>
            questions[currentQuestionIndex].answers.indexOf(correctAnswer)
        );

        setSelectedAnswer({ answer, isCorrect });
        setCorrectAnswerIndexes(correctIndexes);

        // Store the user's selection for the current question
        setUserSelections(prevSelections => {
            const newSelections = [...prevSelections];
            newSelections[currentQuestionIndex] = { answer, isCorrect, correctIndexes };
            return newSelections;
        });

        if (isCorrect) {
            setCorrectAnswers(prevCount => prevCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setCorrectAnswerIndexes([]);
        } else {
            setShowResult(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            const previousSelection = userSelections[currentQuestionIndex - 1];
            if (previousSelection) {
                setSelectedAnswer({ answer: previousSelection.answer, isCorrect: previousSelection.isCorrect });
                setCorrectAnswerIndexes(previousSelection.correctIndexes);
            } else {
                setSelectedAnswer(null);
                setCorrectAnswerIndexes([]);
            }
        }
    };

    const handleDialogClose = () => {
        resetQuiz();
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
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{ style: { width: "80%", height: "80%" } }}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                Random
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
                            <div className="answers-container">
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <Button
                                        key={index}
                                        variant="contained"
                                        onClick={() => handleAnswerClick(answer, index)}
                                        disabled={!!selectedAnswer} // Disable once an answer is selected
                                        style={{
                                            backgroundColor: selectedAnswer && selectedAnswer.answer === answer ?
                                                (selectedAnswer.isCorrect ? 'green' : 'red') :
                                                (correctAnswerIndexes.includes(index) ? 'green' : ''),
                                                opacity: 1,
                                                color: 'white'
                                        }}
                                    >
                                        {answer}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            variant="contained"
                            sx={{ marginRight: '8px', textTransform: 'none' }}
                        >
                            <ArrowBackIcon/>
                        </Button>
                        <Button
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer} // Disable Next until an answer is selected
                            variant="contained"
                            sx={{ textTransform: 'none' }}
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Τέλος' : <ArrowForwardIcon />}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default QuizDialog3;