import { test, expect } from '@playwright/test';

test.describe('Chat Flow', () => {
  test('should load chat page and allow sending a message', async ({ page }) => {
    await page.goto('/chat');
    
    // Expect the title to be present
    await expect(page.getByRole('heading', { name: /VoteWise AI/i }).first()).toBeVisible();
    
    const input = page.getByPlaceholder(/Ask about elections/i);
    await input.fill('How to register?');
    
    // Press Enter to send
    await input.press('Enter');
    
    // Check if user message is visible in chat
    await expect(page.getByText('How to register?')).toBeVisible();
    
    // AI is mocked, but we should see a loading spinner or eventually a response
    // Waiting for either "thinking..." or the actual response bubble
    // We just verify the chat UI didn't crash.
  });

  test('should allow clearing the chat', async ({ page }) => {
    await page.goto('/chat');
    
    const clearButton = page.getByRole('button', { name: /Clear/i });
    await clearButton.click();
    
    await expect(page.getByText(/Suggested Questions/i)).toBeVisible();
  });
});
