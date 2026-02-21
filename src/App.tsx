import morpheus from './assets/images/morpheus.png';
import MatrixEffect from './matrix/Matrix';
import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import WargamesPage from './pages/WargamesPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/quizzes" element={<QuizPage />} />
          <Route path="/wargames" element={<WargamesPage />} />
          <Route path="/matrix" element={<MatrixEffect overlayImage={morpheus} />} />
        </Routes>
      </BrowserRouter>
      <footer className="bottom-0 left-0 right-0 py-2 text-center text-xs text-gray-500">
        Made by{' '}
        <a href="https://github.com/mgiannopoulos24" target="_blank" rel="noopener noreferrer">
          mgiannopoulos24
        </a>
        <br />
        For any suggestions, please{' '}
        <a
          href="https://github.com/mgiannopoulos24/Hack-Intro-Lectures/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          open an issue or PR.
        </a>
      </footer>
    </>
  );
};

export default App;
