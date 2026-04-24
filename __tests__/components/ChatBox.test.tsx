import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatBox from '@/components/ChatBox';
import { useLanguage } from '@/hooks/useLanguage';
import * as actions from '@/app/actions';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: vi.fn(),
}));

vi.mock('@/app/actions', () => ({
  generateElectionResponse: vi.fn(),
}));

describe('ChatBox Component', () => {
  beforeEach(() => {
    (useLanguage as any).mockReturnValue({
      t: (key: string) => key,
      lang: 'en',
    });
    vi.clearAllMocks();
  });

  it('renders initial welcome message and suggested questions', () => {
    render(<ChatBox />);
    expect(screen.getByText(/VoteWise AI, your election awareness assistant/i)).toBeInTheDocument();
    expect(screen.getByText('Suggested Questions')).toBeInTheDocument();
  });

  it('allows user to send a message and renders AI response', async () => {
    (actions.generateElectionResponse as any).mockResolvedValue('This is a mock AI response about elections.');

    render(<ChatBox />);
    
    const input = screen.getByPlaceholderText('chatPlaceholder');
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    
    // Find the send button (second button if mic is first, or by icon)
    // Actually we can hit enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Expect user message to appear
    expect(screen.getByText('How do I vote?')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText('This is a mock AI response about elections.')).toBeInTheDocument();
    });
    
    expect(actions.generateElectionResponse).toHaveBeenCalledWith('How do I vote?', 'en');
  });

  it('clears chat when clear button is clicked', async () => {
    render(<ChatBox />);
    
    const clearBtn = screen.getByText('Clear');
    fireEvent.click(clearBtn);
    
    // Only one welcome message should exist, suggestions should be visible again
    expect(screen.getByText('Suggested Questions')).toBeInTheDocument();
  });
});
