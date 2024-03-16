import React from 'react';
import './MainPage.css';
import CustomCard from '../CustomCard/CustomCard';
import cardData from '../cardData.json';


const MainPage = () => {
  return (
    <>
    
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

    </>
  );
};

export default MainPage;