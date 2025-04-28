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
    <Card className="relative flex h-[26rem] w-80 flex-col overflow-hidden rounded-3xl border-none bg-gradient-to-br from-[#232b2b]/80 to-[#1a1a1a]/90 text-[#b5e853] shadow-2xl transition-transform duration-200 hover:scale-105 hover:shadow-[#b5e853]/30">
      <div className="absolute right-5 top-5 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-14 w-14 rounded-full border border-[#b5e853]/40 bg-white/20 text-[#b5e853] shadow-lg backdrop-blur-md transition-all hover:bg-[#b5e853] hover:text-black"
          onClick={onClick}
        >
          <Play className="h-8 w-8" fill="currentColor" strokeWidth={0} />
        </Button>
      </div>

      <CardContent className="flex flex-1 items-center justify-center overflow-hidden p-0">
        <img
          src={typeof image === 'string' ? image : ''}
          alt={sanitize(title)}
          className="h-[85%] w-[85%] object-contain drop-shadow-2xl transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center rounded-b-3xl bg-black/70 p-6 text-center">
        <CardTitle className="mb-1 text-xl font-extrabold tracking-tight">
          {sanitize(title)}
        </CardTitle>
        <CardDescription className="text-base text-[#b5e853]/80">
          {sanitize(description)}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
