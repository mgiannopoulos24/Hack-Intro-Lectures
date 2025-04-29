import HamburgerMenu from '@/components/common/HamburgerMenu';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// Mock the Dialog component to suppress the warning
vi.mock('@/components/ui/dialog', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    DialogContent: ({ children, ...props }) => (
      <div data-testid="dialog-content" {...props}>
        <div id="dialog-description">Navigation menu</div>
        {children}
      </div>
    ),
  };
});

describe('HamburgerMenu', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <HamburgerMenu />
      </BrowserRouter>
    );
  };

  it('renders the menu button', () => {
    renderWithRouter();
    expect(screen.getByText('Open menu')).toBeInTheDocument();
  });

  it('opens the menu when clicked', () => {
    renderWithRouter();
    const menuButton = screen.getByText('Open menu');

    // Click the menu button
    fireEvent.click(menuButton);

    // Menu content should be visible
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Challenges')).toBeInTheDocument();
    expect(screen.getByText('Kahoot')).toBeInTheDocument();
  });
});
