import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText, StickyNote, Video } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface CustomCardProps {
  title: string;
  paper?: string | string[];
  slides?: string;
  part1?: string;
  part2?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, paper, slides, part1, part2 }) => {
  const renderLinkButton = (
    href: string,
    text: string,
    className?: string,
    icon?: React.ReactNode
  ) => (
    <Button
      asChild
      className={`flex w-full items-center justify-center gap-2 bg-[#6876b6] font-mono normal-case text-white hover:bg-[#3a4286] ${className}`}
    >
      <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2"
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{text}</span>
      </Link>
    </Button>
  );

  const renderPaperButtons = (papers: string[]) => {
    const paperPairs = [];
    for (let i = 0; i < papers.length; i += 2) {
      paperPairs.push(papers.slice(i, i + 2));
    }

    return paperPairs.map((pair, index) => (
      <div key={index} className="flex gap-1.5">
        {pair.map((paper, paperIndex) => (
          <div key={paperIndex} className="w-1/2">
            {renderLinkButton(
              paper,
              `Paper ${index * 2 + paperIndex + 1}`,
              '',
              <BookOpenText className="h-4 w-4" />
            )}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <Card className="m-[0.5%] flex w-[100%] max-w-xs flex-col overflow-hidden rounded-lg transition duration-300 max-[425px]:w-[calc(100%-10px)] max-[425px]:max-w-none">
      <CardHeader className="flex min-h-[7.5rem] items-center justify-center bg-[#6876b6] p-4 text-white">
        <CardTitle className="line-clamp-3 text-center font-mono text-lg sm:text-xl">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col gap-2 bg-gray-900 p-4">
        {paper &&
          (typeof paper === 'string' ? (
            renderLinkButton(paper, 'Προτεινόμενο Paper', '', <BookOpenText className="h-4 w-4" />)
          ) : (
            <div className="flex flex-col gap-1.5">{renderPaperButtons(paper.filter(Boolean))}</div>
          ))}

        {slides && renderLinkButton(slides, 'Διαφάνειες', '', <StickyNote className="h-4 w-4" />)}

        {(part1 || part2) && (
          <div className="flex gap-1.5">
            {part1 && renderLinkButton(part1, 'Μέρος 1', 'w-1/2', <Video className="h-4 w-4" />)}
            {part2 && renderLinkButton(part2, 'Μέρος 2', 'w-1/2', <Video className="h-4 w-4" />)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
