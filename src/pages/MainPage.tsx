import CustomCard from '../components/common/CustomCard';
import cardDataJson from '../data/cardData.json';
import axios from 'axios';
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
  author: string;
}

const cardData: CardData[] = cardDataJson;

const MainPage: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loadingQuote, setLoadingQuote] = useState<boolean>(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      setLoadingQuote(true);
      setQuoteError(null);
      try {
        const response = await axios.get<QuoteData>(
          'http://api.quotable.io/random?tags=future|technology|ethics'
        );
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuoteError('Could not fetch quote.');
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <>
      <div className="main-content relative z-10">
        <header className="titles flex flex-col items-center justify-center bg-transparent py-1 font-mono text-[#ffffff]">
          <h1 className="mb-0 block text-2xl md:text-4xl">Hack Intro Lectures</h1>
          <h2 className="block py-1 text-lg md:text-xl">Εαρινό Εξάμηνο 2025</h2>
          <hr className="mb-[1%] w-[80%] border-2 border-dashed border-[#ffffff]" />
        </header>

        <div className="quote-section my-2 px-4 text-center italic text-gray-400">
          {loadingQuote && <p>Loading quote...</p>}
          {quoteError && <p className="text-red-500">{quoteError}</p>}
          {quote && !loadingQuote && !quoteError && (
            <blockquote className="text-sm md:text-base">
              "{quote.content}"
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
      </div>
    </>
  );
};

export default MainPage;
