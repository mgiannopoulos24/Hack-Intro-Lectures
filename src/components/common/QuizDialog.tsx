import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string | string[];
  photo?: string;
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
    const percentage = (correct / total) * 100;
    const msg = `${correct}/${total}`;

    if (percentage < 33)
      return (
        <div className="space-y-4 text-center">
          <div className="text-6xl">😅</div>
          <p className="text-3xl font-bold text-red-400">{msg}</p>
          <p className="text-xl text-gray-700">Time to hit the books! 📚</p>
          <div className="mx-auto h-2 w-32 rounded-full bg-red-200">
            <div className="h-2 rounded-full bg-red-500" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      );
    if (percentage < 66)
      return (
        <div className="space-y-4 text-center">
          <div className="text-6xl">🎯</div>
          <p className="text-3xl font-bold text-yellow-400">{msg}</p>
          <p className="text-xl text-gray-700">Not bad! You're getting there! 🚀</p>
          <div className="mx-auto h-2 w-32 rounded-full bg-yellow-200">
            <div
              className="h-2 rounded-full bg-yellow-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    if (percentage < 90)
      return (
        <div className="space-y-4 text-center">
          <div className="text-6xl">🌟</div>
          <p className="text-3xl font-bold text-blue-400">{msg}</p>
          <p className="text-xl text-gray-700">Great job! You really know your stuff! 💪</p>
          <div className="mx-auto h-2 w-32 rounded-full bg-blue-200">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      );
    return (
      <div className="space-y-4 text-center">
        <div className="text-6xl">🏆</div>
        <p className="text-3xl font-bold text-green-400">{msg}</p>
        <p className="text-xl text-gray-700">Outstanding! Quiz master! 🎉✨</p>
        <div className="mx-auto h-2 w-32 rounded-full bg-green-200">
          <div className="h-2 rounded-full bg-green-500" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    );
  };

  const renderWithNewlines = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const q = questions[current];

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex h-[80dvh] w-[90vw] max-w-none flex-col p-4 sm:h-[85vh] sm:w-[95vw] sm:max-w-4xl sm:p-6">
        <MathJaxContext key={current}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl font-bold sm:text-2xl">{title}</DialogTitle>
          </DialogHeader>
          {showResult ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              {getMessage()}
              <DialogFooter className="mt-8">
                <Button onClick={handleDialogClose} className="px-8 py-2 text-lg font-bold">
                  Back
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col">
              <Progress
                value={((current + 1) / questions.length) * 100}
                className="mb-4 h-3 flex-shrink-0 bg-gray-200 dark:bg-gray-700 sm:mb-6 [&>div]:bg-blue-500 dark:[&>div]:bg-white"
              />

              <div className="mb-4 flex-shrink-0 sm:mb-6">
                <p className="text-center text-lg font-semibold leading-relaxed sm:text-xl">
                  <MathJax>{renderWithNewlines(q.question)}</MathJax>
                </p>
              </div>

              <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 flex min-h-0 flex-1 flex-col overflow-y-auto">
                {q.photo && (
                  <div className="mb-4 flex flex-shrink-0 items-center justify-center sm:mb-6">
                    <img
                      src={images[q.photo]}
                      alt={`Question ${current + 1}`}
                      className="max-h-[200px] max-w-full rounded-lg object-contain shadow-lg sm:max-h-[300px]"
                    />
                  </div>
                )}

                <div className="flex w-full flex-col px-2">
                  <div className="flex flex-col gap-3 pb-4">
                    {q.answers.map((answer, idx) => (
                      <Button
                        key={idx}
                        variant="secondary"
                        onClick={() => handleAnswer(answer)}
                        disabled={!!selected}
                        className={`flex min-h-[50px] w-full flex-shrink-0 items-center justify-center p-3 text-sm normal-case transition-all duration-200 sm:min-h-[60px] sm:p-4 sm:text-base ${
                          selected !== null
                            ? correctIndexes.includes(idx)
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <span className="flex items-bottom justify-center">
                          <MathJax>{renderWithNewlines(answer)}</MathJax>
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-shrink-0 items-center justify-between sm:mt-6">
                <Button
                  onClick={handlePrev}
                  disabled={current === 0}
                  variant="outline"
                  size="sm"
                  className="px-3 sm:px-4"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Prev
                </Button>
                <div className="flex-1"></div>
                <Button
                  onClick={handleNext}
                  disabled={!selected}
                  variant="outline"
                  size="sm"
                  className="px-3 sm:px-4"
                >
                  {current === questions.length - 1 ? (
                    'Finish'
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </MathJaxContext>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
