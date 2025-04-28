import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import images from '@/utils/images';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string | string[];
  photoURL?: string;
}

interface QuizDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  questions: Question[];
  images?: Record<string, string>;
}

const QuizDialog: React.FC<QuizDialogProps> = ({
  open,
  onClose,
  title,
  questions,
  images = {},
}) => {
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);
  const [userSelections, setUserSelections] = useState<
    { answer: string; isCorrect: boolean; correctIndexes: number[] }[]
  >([]);

  useEffect(() => {
    if (open) reset();
  }, [open]);

  const reset = () => {
    setCurrent(0);
    setCorrect(0);
    setShowResult(false);
    setSelected(null);
    setCorrectIndexes([]);
    setUserSelections([]);
  };

  const handleAnswer = (answer: string) => {
    const q = questions[current];
    const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
    const isCorrect = correctArr.includes(answer);
    const indexes = correctArr.map((ans) => q.answers.indexOf(ans));
    setSelected(answer);
    setCorrectIndexes(indexes);

    setUserSelections((prev) => {
      const next = [...prev];
      next[current] = { answer, isCorrect, correctIndexes: indexes };
      return next;
    });

    if (isCorrect) setCorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((i) => i + 1);
      setSelected(null);
      setCorrectIndexes([]);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((i) => i - 1);
      const prevSel = userSelections[current - 1];
      if (prevSel) {
        setSelected(prevSel.answer);
        setCorrectIndexes(prevSel.correctIndexes);
      } else {
        setSelected(null);
        setCorrectIndexes([]);
      }
    }
  };

  const handleDialogClose = () => {
    reset();
    onClose();
  };

  const getMessage = () => {
    const total = questions.length;
    const msg = `You scored ${correct} out of ${total}`;
    if (correct <= 3)
      return (
        <>
          <p className="text-2xl font-bold">{msg}</p>
          <p className="text-xl">Oh 🙁 Better luck next time</p>
        </>
      );
    if (correct <= 7)
      return (
        <>
          <p className="text-2xl font-bold">{msg}</p>
          <p className="text-xl">A for effort! 🙂</p>
        </>
      );
    return (
      <>
        <p className="text-2xl font-bold">{msg}</p>
        <p className="text-xl">Congratulations!!🎉</p>
      </>
    );
  };

  const q = questions[current];

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex h-[80vh] w-[90vw] max-w-2xl flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        {showResult ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            {getMessage()}
            <DialogFooter className="mt-6">
              <Button onClick={handleDialogClose} className="font-bold">
                Πίσω
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <Progress value={((current + 1) / questions.length) * 100} className="mb-4" />
            <div className="flex flex-1 flex-col items-center justify-center">
              {q.photoURL && (
                <img
                  src={images[q.photoURL]}
                  alt={`Question ${current + 1}`}
                  className="max-h-48 max-w-full object-contain"
                />
              )}
              <p className="mb-4 text-center text-lg font-semibold">{q.question}</p>
              <div className="flex w-full flex-col items-center">
                {q.answers.map((answer, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    onClick={() => handleAnswer(answer)}
                    disabled={!!selected}
                    className={`mb-2 w-[70%] max-w-xs text-base normal-case ${
                      selected && selected === answer
                        ? correctIndexes.includes(idx)
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                        : correctIndexes.includes(idx)
                          ? 'bg-green-600 text-white'
                          : ''
                    } ${selected ? 'opacity-100' : ''} `}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
            </div>
            <DialogFooter className="mt-4 flex justify-center gap-2">
              <Button onClick={handlePrev} disabled={current === 0} variant="outline" size="icon">
                <ChevronLeft />
              </Button>
              <Button onClick={handleNext} disabled={!selected} variant="outline" size="icon">
                {current === questions.length - 1 ? 'Τέλος' : <ChevronRight />}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
