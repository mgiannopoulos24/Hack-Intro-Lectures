import WargamesPage from '@/pages/WargamesPage';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// Mock the images - add default export
vi.mock('@/assets/images/otw.png', () => ({
  default: 'mocked-otw-image',
}));
vi.mock('@/assets/images/picoctf.png', () => ({
  default: 'mocked-picoctf-image',
}));
vi.mock('@/assets/images/sts.png', () => ({
  default: 'mocked-sts-image',
}));

// Mock the wargames data - add default export
vi.mock('@/data/wargames.json', () => ({
  default: [
    {
      url: 'https://example.com/wargame1',
      image: 'otw.png',
      title: 'Test Wargame 1',
      description: 'Test Description 1',
      difficulty: { value: 'Easy', color: 'bg-lime-500' },
    },
    {
      url: 'https://example.com/wargame2',
      image: 'sts.png',
      title: 'Test Wargame 2',
      description: 'Test Description 2',
      difficulty: { value: 'Medium', color: 'bg-orange-400' },
    },
  ],
}));

describe('WargamesPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <WargamesPage />
      </BrowserRouter>
    );
  };

  it('renders the page header', () => {
    renderWithRouter();

    expect(screen.getByText('Wargames')).toBeInTheDocument();
    expect(screen.getByText('For fun and profit :)')).toBeInTheDocument();
  });

  it('renders wargame cards from the data', () => {
    renderWithRouter();

    expect(screen.getByText('Test Wargame 1')).toBeInTheDocument();
    expect(screen.getByText('Test Wargame 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
  });

  it('renders links to the wargame URLs', () => {
    renderWithRouter();

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', 'https://example.com/wargame1');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/wargame2');
  });

  it('renders the hamburger menu', () => {
    renderWithRouter();

    expect(screen.getByText('Open menu')).toBeInTheDocument();
  });
});
