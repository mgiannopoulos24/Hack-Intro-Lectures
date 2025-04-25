import './App.css';
import MainPage from './pages/MainPage';
// import Wargames from './Wargames/Wargames';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Define the component using React.FC (Functional Component) for type safety
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/Wargames" element={<Wargames />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
