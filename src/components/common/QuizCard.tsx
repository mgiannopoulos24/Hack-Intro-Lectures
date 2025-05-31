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
    <Card className="w-80 overflow-hidden border border-gray-700 bg-[#4a690f] shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Image Section */}
      <div className="h-48 overflow-hidden px-4 pt-4">
        <img
          src={typeof image === 'string' ? image : ''}
          alt={sanitize(title)}
          className="h-full w-full bg-transparent object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <CardTitle className="mb-2 line-clamp-2 text-lg font-medium">{sanitize(title)}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
          {sanitize(description)}
        </CardDescription>
      </CardContent>

      {/* Footer with Button */}
      <CardFooter className="p-4 pt-0">
        <Button onClick={onClick} className="w-full" variant="default">
          <Play className="mr-2 h-4 w-4" />
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
