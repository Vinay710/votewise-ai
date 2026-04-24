import { test, expect } from '@playwright/test';

test.describe('Fake News Detector Flow', () => {
  test('should load fake news page and allow claim analysis', async ({ page }) => {
    await page.goto('/fake-news');
    
    await expect(page.getByRole('heading', { name: /Fake News Detector/i })).toBeVisible();
    
    const textarea = page.getByPlaceholder(/Voting has been postponed/i);
    await textarea.fill('Elections are cancelled tomorrow.');
    
    const analyzeButton = page.getByRole('button', { name: /Analyze Claim/i });
    await analyzeButton.click();
    
    // In e2e the API might not have a key, so it returns the fallback message
    // Just verify the Analysis Result section eventually shows up
    await expect(page.getByText('Analysis Result')).toBeVisible({ timeout: 10000 });
  });
});
