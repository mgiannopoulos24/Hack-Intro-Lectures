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
import QuizDialog1 from "../Quizzes/QuizDialog1";
import QuizDialog2 from "../Quizzes/QuizDialog2";
import QuizDialog3 from "../Quizzes/QuizDialog3";
import QuizDialog4 from "../Quizzes/QuizDialog4";
import QuizDialog5 from "../Quizzes/QuizDialog5";
import QuizDialog6 from "../Quizzes/QuizDialog6";

const Wargames = () => {
    const [value, setValue] = useState(0);
    const [openDialog1, setOpenDialog1] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [openDialog4, setOpenDialog4] = useState(false);
    const [openDialog5, setOpenDialog5] = useState(false);
    const [openDialog6, setOpenDialog6] = useState(false);

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
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #1"} description={"Stack Basics"} onClick={() => setOpenDialog1(true)}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #2"} description={"Security Fundamentals"} onClick={() => setOpenDialog2(true)}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #3"} description={"Random"} onClick={() => setOpenDialog3(true)}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #4"} description={"Crypto 1"} onClick={() => setOpenDialog4(true)}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #5"} description={"Integrity"} onClick={() => setOpenDialog5(true)}/>
                    <QuizCard image={kahoot_img} title={"Kahoot Quiz #6"} description={"Hashes and more"} onClick={() => setOpenDialog6(true)}/>
                    <QuizDialog1 open={openDialog1} onClose={() => setOpenDialog1(false)} />
                    <QuizDialog2 open={openDialog2} onClose={() => setOpenDialog2(false)} />
                    <QuizDialog3 open={openDialog3} onClose={() => setOpenDialog3(false)} />
                    <QuizDialog4 open={openDialog4} onClose={() => setOpenDialog4(false)} />
                    <QuizDialog5 open={openDialog5} onClose={() => setOpenDialog5(false)} />
                    <QuizDialog6 open={openDialog6} onClose={() => setOpenDialog6(false)} />
                </div>
            )}

        </div>
        </>
    );
}

export default Wargames;
