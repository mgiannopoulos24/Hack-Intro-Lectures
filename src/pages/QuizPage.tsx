import kahoot_img from '../assets/images/kahoot.png';
import HamburgerMenu from '../components/common/HamburgerMenu';
import QuizCard from '../components/common/QuizCard';
import QuizDialog from '../components/common/QuizDialog';
import quizzesData from '@/data/quizzes.json';
import { loadQuizImage } from '@/utils/images';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string | string[];
  photo?: string;
}

interface QuizData {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const QuizPage: React.FC = () => {
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);
  const [quizImages, setQuizImages] = useState<Record<string, string>>({});

  const handleOpenDialog = (id: number) => setActiveQuizId(id);
  const handleCloseDialog = () => setActiveQuizId(null);

  const activeQuiz = (quizzesData as QuizData[]).find((q) => q.id === activeQuizId);

  // Load all quiz images when component mounts
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Record<string, Promise<string | null>> = {};

      // Collect all unique image references from all quizzes
      const allImageKeys = new Set<string>();
      (quizzesData as QuizData[]).forEach((quiz) => {
        quiz.questions.forEach((question) => {
          if (question.photo) {
            allImageKeys.add(question.photo);
          }
        });
      });

      // Load all images
      for (const imageKey of Array.from(allImageKeys)) {
        imagePromises[imageKey] = loadQuizImage(imageKey);
      }

      // Resolve all promises and filter out failed loads
      const resolvedImages: Record<string, string> = {};
      for (const [key, promise] of Object.entries(imagePromises)) {
        const image = await promise;
        if (image) {
          resolvedImages[key] = image;
        }
      }

      setQuizImages(resolvedImages);
    };

    loadImages();
  }, []);

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

        <div className="m-5 flex flex-wrap justify-center gap-4 p-4 text-center">
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
            images={quizImages}
          />
        )}

        <span className="sr-only">I have dreamed a dream, but now that dream is gone from me.</span>
      </div>
    </>
  );
};

export default QuizPage;
