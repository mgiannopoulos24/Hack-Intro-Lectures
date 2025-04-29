import MainPage from '@/pages/MainPage';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// Mock the quotesData to control what gets displayed
vi.mock('@/data/quotes.json', () => ({
  default: [
    {
      content: 'Test quote content',
      author: 'Test Author',
    },
  ],
}));

// Mock the cardData
vi.mock('@/data/cardData.json', () => ({
  default: [
    {
      id: 1,
      title: 'Test Card Title',
      paper: 'https://example.com/paper',
      slides: 'https://example.com/slides',
    },
  ],
}));

describe('MainPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
  };

  it('renders the page header', () => {
    renderWithRouter();
    expect(screen.getByText('Hack Intro Lectures')).toBeInTheDocument();
    expect(screen.getByText('Εαρινό Εξάμηνο 2025')).toBeInTheDocument();
  });

  it('renders a random quote', () => {
    renderWithRouter();
    expect(screen.getByText('"Test quote content"')).toBeInTheDocument();
    expect(screen.getByText('- Test Author')).toBeInTheDocument();
  });

  it('renders lecture cards', () => {
    renderWithRouter();
    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
  });

  it('renders the hamburger menu', () => {
    renderWithRouter();
    expect(screen.getByText('Open menu')).toBeInTheDocument();
  });
});
