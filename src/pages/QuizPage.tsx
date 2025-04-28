import kahoot_img from '../assets/images/kahoot.png';
import HamburgerMenu from '../components/common/HamburgerMenu';
import QuizCard from '../components/common/QuizCard';
import QuizDialog from '../components/common/QuizDialog';
import quizzesData from '@/data/quizzes.json';
import images from '@/utils/images';
import React, { useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string | string[];
  photoURL?: string;
}

interface QuizData {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const QuizPage: React.FC = () => {
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => setActiveQuizId(id);
  const handleCloseDialog = () => setActiveQuizId(null);

  const activeQuiz = (quizzesData as QuizData[]).find((q) => q.id === activeQuizId);

  return (
    <>
      <div className="absolute right-4 top-4 z-20">
        <HamburgerMenu />
      </div>

      <div className="main-content relative z-10">
        <header className="flex flex-col items-center justify-center bg-transparent py-1 pt-8 font-mono text-[#ffffff]">
          <h1 className="mb-0 block text-2xl md:text-4xl">Kahoot Quizzes</h1>
          <h2 className="block py-1 text-lg md:text-xl">Test Your Knowledge!</h2>
          <hr className="mb-[1%] w-[80%] border-2 border-dashed border-[#ffffff]" />
        </header>

        <div className="m-5 flex flex-wrap justify-center gap-4 p-4">
          {(quizzesData as QuizData[]).map((quiz) => (
            <QuizCard
              key={quiz.id}
              image={kahoot_img}
              title={quiz.title}
              description={quiz.description}
              onClick={() => handleOpenDialog(quiz.id)}
            />
          ))}
        </div>

        {activeQuiz && (
          <QuizDialog
            open={true}
            onClose={handleCloseDialog}
            title={activeQuiz.title}
            questions={activeQuiz.questions}
            images={images}
          />
        )}

        {/* A yes or a no? */}
      </div>
    </>
  );
};

export default QuizPage;
