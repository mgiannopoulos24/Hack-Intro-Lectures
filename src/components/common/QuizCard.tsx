import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import React from 'react';

interface QuizCardProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const sanitize = (str?: string) => (str ?? '').replace(/[^a-zA-Z0-9 \-_.]/g, '').slice(0, 100);

const QuizCard: React.FC<QuizCardProps> = ({ image, title, description, onClick }) => {
  return (
    <Card className="group w-80 overflow-hidden border border-gray-800 bg-gray-900/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={typeof image === 'string' ? image : ''}
          alt={sanitize(title)}
          className="h-full w-full bg-transparent object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-3 left-3 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-sm">
          Quiz
        </div>
      </div>

      <CardContent className="p-5">
        <CardTitle className="mb-2 text-xl font-semibold text-white transition-colors duration-200 group-hover:text-green-400">
          {sanitize(title)}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-gray-400">
          {sanitize(description)}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          onClick={onClick}
          className="w-full gap-2 bg-green-600 text-white transition-all duration-200 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25"
        >
          <Play className="h-4 w-4" />
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
