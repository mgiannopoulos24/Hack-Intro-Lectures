import TiltCard from '@/components/common/TiltCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the react-tilt component
vi.mock('react-tilt', () => ({
  Tilt: ({ children }) => <div data-testid="tilt-component">{children}</div>,
}));

describe('TiltCard', () => {
  const mockProps = {
    image: 'test-image.png',
    title: 'Test Title',
    description: 'Test Description',
    difficulty: { value: 'Easy', color: 'bg-lime-500' },
  };

  it('renders card with correct title and description', () => {
    render(<TiltCard {...mockProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders the difficulty badge', () => {
    render(<TiltCard {...mockProps} />);

    const difficultyBadge = screen.getByText('Easy');
    expect(difficultyBadge).toBeInTheDocument();
    expect(difficultyBadge).toHaveClass('bg-lime-500');
  });

  it('renders the image with correct src', () => {
    render(<TiltCard {...mockProps} />);

    const image = screen.getByAltText('wg-img');
    expect(image).toHaveAttribute('src', 'test-image.png');
  });

  it('wraps content in a Tilt component', () => {
    render(<TiltCard {...mockProps} />);

    expect(screen.getByTestId('tilt-component')).toBeInTheDocument();
  });
});
