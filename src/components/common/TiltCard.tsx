import React from 'react';
import { Tilt } from 'react-tilt';

interface Difficulty {
  value: string;
  color: string;
}

interface TiltCardProps {
  image: string;
  title: string;
  description: string;
  difficulty: Difficulty;
}

const defaultOptions = {
  reverse: false,
  max: 15,
};

const TiltCard: React.FC<TiltCardProps> = ({ image, title, description, difficulty }) => {
  return (
    <Tilt options={defaultOptions}>
      <div className="relative flex h-[25rem] w-80 scale-90 flex-col gap-4 overflow-hidden rounded-xl border-2 border-lime-300 bg-black/90 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-95">
        <div className="h-[75%]">
          <img src={image} alt="wg-img" className="h-full w-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-[25%] flex-col items-center justify-center bg-black/70 p-4 text-lime-300">
          <h2 className="text-xl font-bold">{title}</h2>
          <h3 className="text-base">{description}</h3>
          <span
            className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold text-black ${difficulty.color}`}
          >
            {difficulty.value}
          </span>
        </div>
      </div>
    </Tilt>
  );
};

export default TiltCard;
