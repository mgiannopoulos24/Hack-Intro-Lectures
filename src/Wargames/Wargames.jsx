import React, { useState } from "react";
import "./Wargames.css";
import TiltCard from "../TiltCard/TiltCard";
import otw_img from "../assets/cat2.png";
import sts_img from "../assets/sts.png";
import pico_img from "../assets/picoctf.png";
import kahoot_img from "../assets/kahoot.png";
import { Link } from "react-router-dom";
import ΒackButton from "../BackToMain/BackButton";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizCard from "../Kahoot/QuizCard";
//import quizzes from "../quizzes.json";

const Wargames = () => {
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <>
        <ΒackButton/>
        <div className="wg-content">
            <header className='wg-titles'>
                <h1>Wargames</h1>
                <h3>For fun and profit</h3>
                <hr/>
            </header>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered id="wg-tabs" sx={{'& .MuiTabs-indicator': {backgroundColor: '#b5e853'}}}>
                <Tab icon={<SportsEsportsIcon/>} label="Wargames" id="wg-tab"/>
                <Tab icon={<QuizIcon />} label="Kahoot" id="wg-tab"/>
            </Tabs>
            {value === 0 && (
                <div className='wg-cards'>
                    <Link to="https://overthewire.org/wargames/narnia/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Narnia" description="Binary Exploitation"/></Link>
                    <Link to="https://overthewire.org/wargames/behemoth/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Behemoth" description="Binary Exploitation"/></Link>
                    <Link to="https://overthewire.org/wargames/maze/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Maze" description="Binary Exploitation"/></Link>
                    <Link to="https://overthewire.org/wargames/leviathan/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Leviathan" description="Binary Exploitation"/></Link>
                    <Link to="https://overthewire.org/wargames/utumno/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Otumno" description="Binary Exploitation"/></Link>
                    <Link to="https://www.smashthestack.org/blowfish.html" target="_blank" rel="noopener noreferrer"><TiltCard image={sts_img} title="Blowfish" description="Binary Exploitation"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=1" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="Web Exploitation"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=2" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="Cryptography"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=3" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="Reverse Engineering"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=4" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="Forensics"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=5" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="General Skills"/></Link>
                    <Link to="https://play.picoctf.org/practice?category=6" target="_blank" rel="noopener noreferrer"><TiltCard image={pico_img} title="PicoCTF" description="Binary Exploitation"/></Link>
                </div>
            )}
            {value === 1 && (
                <div className="kahoot-quiz">
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #1"} description={"Stack Basics"}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #2"} description={"Security Fundamentals"}/>
                </div>
            )}

        </div>
        </>
    );
}

export default Wargames;
