import './App.css';
import React from 'react';
import MainPage from './MainPage/MainPage';
import MatrixEffect from './MatrixTheme/MatrixEffect';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Wargames from './Wargames/Wargames';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <MatrixEffect />
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/Wargames" element={<Wargames />} />
      </Routes>
    </BrowserRouter>   
    </>
  );
}
