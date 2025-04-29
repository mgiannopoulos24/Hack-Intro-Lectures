import MainPage from '../pages/MainPage';
import QuizPage from '../pages/QuizPage';
import WargamesPage from '../pages/WargamesPage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

// Mock the components to avoid rendering their content
const TestApp = ({ initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/quizzes" element={<QuizPage />} />
      <Route path="/wargames" element={<WargamesPage />} />
    </Routes>
  </MemoryRouter>
);

describe('App', () => {
  it('renders the MainPage component on the root path', () => {
    render(<TestApp initialEntries={['/']} />);
    expect(screen.getByText('Hack Intro Lectures')).toBeInTheDocument();
  });

  it('renders the QuizPage component on the /quizzes path', () => {
    render(<TestApp initialEntries={['/quizzes']} />);
    expect(screen.getByText('Kahoot Quizzes')).toBeInTheDocument();
  });

  it('renders the WargamesPage component on the /wargames path', () => {
    render(<TestApp initialEntries={['/wargames']} />);
    expect(screen.getByText('Wargames')).toBeInTheDocument();
  });
});
