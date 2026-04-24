import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/hooks/useLanguage';

// Mock the hook
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: vi.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    (useLanguage as any).mockReturnValue({
      t: (key: string) => key,
      lang: 'en',
      setLang: vi.fn(),
    });
  });

  it('renders the brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('VoteWise AI')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger icon is clicked', () => {
    render(<Navbar />);
    
    // Initially, mobile menu links (e.g., inside the motion.div) might not be visible or are hidden by CSS.
    // RTL will still find the text if it's in the DOM, but let's check the toggle button interaction.
    const menuButton = screen.getAllByRole('button').find(btn => btn.className.includes('md:hidden'));
    
    expect(menuButton).toBeInTheDocument();
    
    if (menuButton) {
      fireEvent.click(menuButton);
      // Wait for the state update, the mobile menu should now render the links.
      // We can check if 'home' is present multiple times (desktop + mobile)
      const homeLinks = screen.getAllByText('home');
      expect(homeLinks.length).toBeGreaterThan(1);
    }
  });

  it('toggles language menu when globe icon is clicked', () => {
    render(<Navbar />);
    
    // Find globe button (aria-label="Select language")
    const langBtn = screen.getByLabelText('Select language');
    fireEvent.click(langBtn);
    
    // After clicking, 'English' should be visible in the dropdown
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/हिंदी/i)).toBeInTheDocument();
    expect(screen.getByText(/ಕನ್ನಡ/i)).toBeInTheDocument();
  });
});
