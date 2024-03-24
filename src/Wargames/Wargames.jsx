import React from "react";
import "./Wargames.css";
import TiltCard from "../TiltCard/TiltCard";
import otw_img from "../assets/cat2.png";
import sts_img from "../assets/sts.png";
import { Link } from "react-router-dom";
import ΒackButton from "../BackToMain/BackButton";

const Wargames = () => {
    return (
        <>
        <ΒackButton/>
        <div className="wg-content">
            <header className='wg-titles'>
            <h1>Wargames</h1>
            <h3>For fun and profit</h3>
            <hr/>
            </header>
            <div className='wg-cards'>
            <Link to="https://overthewire.org/wargames/narnia/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Narnia" description="Binary Exploitation"/></Link>
            <Link to="https://overthewire.org/wargames/behemoth/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Behemoth" description="Binary Exploitation"/></Link>
            <Link to="https://overthewire.org/wargames/maze/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Maze" description="Binary Exploitation"/></Link>
            <Link to="https://overthewire.org/wargames/leviathan/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Leviathan" description="Binary Exploitation"/></Link>
            <Link to="https://overthewire.org/wargames/utumno/" target="_blank" rel="noopener noreferrer"><TiltCard image={otw_img} title="Otumno" description="Binary Exploitation"/></Link>
            <Link to="https://www.smashthestack.org/blowfish.html" target="_blank" rel="noopener noreferrer"><TiltCard image={sts_img} title="Blowfish" description="Binary Exploitation"/></Link>
            </div>
        </div>
        </>
    );
}

export default Wargames;