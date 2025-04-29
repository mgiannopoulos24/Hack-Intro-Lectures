import CustomCard from '@/components/common/CustomCard';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

// Mock the CustomCard component
describe('CustomCard', () => {
  const renderWithRouter = (props) => {
    return render(
      <BrowserRouter>
        <CustomCard {...props} />
      </BrowserRouter>
    );
  };

  it('renders the card title', () => {
    renderWithRouter({ title: 'Test Title' });
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders a paper link when provided', () => {
    renderWithRouter({
      title: 'Test Title',
      paper: 'https://example.com/paper',
    });

    const paperButton = screen.getByText('Προτεινόμενο Paper');
    expect(paperButton).toBeInTheDocument();
    expect(paperButton.closest('a')).toHaveAttribute('href', 'https://example.com/paper');
  });

  it('renders multiple paper links when provided as an array', () => {
    renderWithRouter({
      title: 'Test Title',
      paper: ['https://example.com/paper1', 'https://example.com/paper2'],
    });

    const paper1Button = screen.getByText('Paper 1');
    const paper2Button = screen.getByText('Paper 2');

    expect(paper1Button).toBeInTheDocument();
    expect(paper2Button).toBeInTheDocument();

    expect(paper1Button.closest('a')).toHaveAttribute('href', 'https://example.com/paper1');
    expect(paper2Button.closest('a')).toHaveAttribute('href', 'https://example.com/paper2');
  });

  it('renders slides link when provided', () => {
    renderWithRouter({
      title: 'Test Title',
      slides: 'https://example.com/slides',
    });

    const slidesButton = screen.getByText('Διαφάνειες');
    expect(slidesButton).toBeInTheDocument();
    expect(slidesButton.closest('a')).toHaveAttribute('href', 'https://example.com/slides');
  });

  it('renders part1 and part2 links when provided', () => {
    renderWithRouter({
      title: 'Test Title',
      part1: 'https://example.com/part1',
      part2: 'https://example.com/part2',
    });

    const part1Button = screen.getByText('Μέρος 1');
    const part2Button = screen.getByText('Μέρος 2');

    expect(part1Button).toBeInTheDocument();
    expect(part2Button).toBeInTheDocument();

    expect(part1Button.closest('a')).toHaveAttribute('href', 'https://example.com/part1');
    expect(part2Button.closest('a')).toHaveAttribute('href', 'https://example.com/part2');
  });
});
