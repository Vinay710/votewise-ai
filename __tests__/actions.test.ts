import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateElectionResponse, detectFakeNews, compareCandidates } from '@/app/actions';

// Mock the Gemini SDK
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: vi.fn().mockResolvedValue({
          response: {
            text: () => 'Mocked Gemini API response',
          },
        }),
      }),
    })),
  };
});

describe('Server Actions (AI Flow)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test_key';
  });

  it('generateElectionResponse returns expected output', async () => {
    const response = await generateElectionResponse('How do I vote?');
    expect(response).toBe('Mocked Gemini API response');
  });

  it('detectFakeNews returns expected output', async () => {
    const response = await detectFakeNews('Fake claim');
    expect(response).toBe('Mocked Gemini API response');
  });

  it('compareCandidates returns expected output', async () => {
    const response = await compareCandidates('Candidate A vs Candidate B');
    expect(response).toBe('Mocked Gemini API response');
  });

  it('handles missing API key gracefully', async () => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    const response = await generateElectionResponse('How do I vote?');
    expect(response).toContain('Please configure a valid Gemini API key');
  });
});
