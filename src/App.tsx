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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
