import React from 'react';
import './MainPage.css';

import CustomCard from '../CustomCard/CustomCard';
import cardData from '../cardData.json';
import GameButton from '../GameButton/GameButton';

const MainPage = () => {
  return (
    <>
      
      <div className="main-content">
        <header className='titles'>
          <h1>Hack Intro Lectures</h1>
          <h3>Εαρινό Εξάμηνο 2024</h3>
          <hr/>
        </header>
        <div className='cards'>
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
        <GameButton />
      </div>
    </>
  );
};

export default MainPage;
