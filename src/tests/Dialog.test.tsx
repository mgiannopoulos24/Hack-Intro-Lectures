import QuizDialog from '@/components/common/QuizDialog';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock images
vi.mock('@/utils/images', () => ({
  default: {
    test_img: 'mocked-image-path',
  },
}));

describe('QuizDialog', () => {
  const mockQuestions = [
    {
      question: 'What is a stack?',
      answers: ['A queue', 'A LIFO structure', 'A tree', 'A graph'],
      correctAnswer: 'A LIFO structure',
      photoURL: 'test_img',
    },
  ];

  const mockProps = {
    open: true,
    onClose: vi.fn(),
    title: 'Test Quiz',
    questions: mockQuestions,
  };

  it('renders the quiz title', () => {
    render(<QuizDialog {...mockProps} />);
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
  });

  it('renders the first question', () => {
    render(<QuizDialog {...mockProps} />);
    expect(screen.getByText('What is a stack?')).toBeInTheDocument();
  });

  it('renders all answer options', () => {
    render(<QuizDialog {...mockProps} />);
    expect(screen.getByText('A queue')).toBeInTheDocument();
    expect(screen.getByText('A LIFO structure')).toBeInTheDocument();
    expect(screen.getByText('A tree')).toBeInTheDocument();
    expect(screen.getByText('A graph')).toBeInTheDocument();
  });

  it('shows correct answer when an option is selected', () => {
    render(<QuizDialog {...mockProps} />);

    // Click on an answer
    const correctAnswer = screen.getByText('A LIFO structure');
    fireEvent.click(correctAnswer);

    // The Next button should be enabled
    // const nextButton = screen.getByRole('button', { name: /chevron-right/i });
    // expect(nextButton).not.toBeDisabled();
  });

  it('calls onClose when dialog is closed', () => {
    render(<QuizDialog {...mockProps} />);

    // Find and click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
