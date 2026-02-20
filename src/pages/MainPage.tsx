import CustomCard from '@/components/common/CustomCard';
import HamburgerMenu from '@/components/common/HamburgerMenu';
import cardDataJson from '@/data/cardData.json';
import quotesData from '@/data/quotes.json';
import { useEffect, useState } from 'react';

interface CardData {
  id: number;
  title: string;
  paper?: string | string[];
  slides?: string;
  part1?: string;
  part2?: string;
}

interface QuoteData {
  content: string;
  author?: string;
}

const cardData: CardData[] = cardDataJson;
const quotes: QuoteData[] = quotesData;

const MainPage: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <>
      <div className="absolute right-4 top-4 z-20">
        <HamburgerMenu />
      </div>

      <div className="main-content relative z-10">
        <header className="titles flex flex-col items-center justify-center bg-transparent py-1 pt-8 text-[#ffffff]">
          <h1 className="mb-0 block text-2xl md:text-4xl">Hack Intro Lectures</h1>
          <h2 className="block py-4 text-lg md:text-xl">Spring Semester 2026</h2>
          <hr className="mb-[1%] w-[80%] border-2 border-dashed border-[#ffffff]" />
        </header>

        <div className="quote-section my-4 px-4 text-center italic text-gray-400 max-w-2xl mx-auto">
          {quote && (
            <blockquote className="text-sm md:text-base">
              {quote.content}
              <footer className="mt-1 text-xs not-italic text-gray-500 md:text-sm">
                - {quote.author}
              </footer>
            </blockquote>
          )}
        </div>

        <div className="cards m-5 flex flex-wrap justify-center gap-7 md:m-5 md:gap-3">
          {cardData.map((card) => (
            <CustomCard
              key={card.id}
              title={card.title}
              paper={card.paper}
              slides={card.slides}
              part1={card.part1}
              part2={card.part2}
            />
          ))}
        </div>
        <span className="sr-only">
          You take the blue pill – the story ends, you wake up in your bed and believe whatever you
          want to believe. You take the red pill – you stay in Wonderland and I show you how deep
          the rabbit-hole goes.
        </span>
      </div>
    </>
  );
};

export default MainPage;
