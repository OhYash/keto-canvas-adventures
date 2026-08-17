import { describe, test, expect, waitForCanvasAnimation, getBodyText } from '../harness.js';

export function registerInteractionsTests() {
  describe('Interactive UI & Progressive Disclosure', () => {
    test('Compact Placeholders: Clicking placeholder card expands section', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // Verify Home is expanded and placeholder badges exist
      const initialText = await getBodyText(page);
      expect(initialText).toContain('I own backend systems end-to-end');
      expect(initialText).toContain('Pan or click to expand');

      // Click specifically on the Work placeholder card
      const clicked = await page.evaluate(() => {
        const placeholderCards = Array.from(
          document.querySelectorAll('[class*="cursor-pointer"]')
        ).filter(
          (el) => el.textContent?.includes('My Work Life') && el.textContent?.includes('Pan or click to expand')
        );
        const card = placeholderCards[placeholderCards.length - 1];
        if (card) {
          card.click();
          return true;
        }
        return false;
      });

      expect(clicked).toBe(true);
      await waitForCanvasAnimation(page, 1500);

      // Verify URL updated and Work section is fully expanded
      expect(page.url()).toContain('/work');
      const expandedText = await getBodyText(page);
      expect(expandedText).toContain('Most Recent Role');
    });

    test('Contact Section: Progressive email disclosure is obfuscated until click', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // Verify initial state shows "Click to reveal" and NOT plaintext email
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('Click to reveal');
      expect(bodyText).not.toContain('yash@'); // Invariant: no plaintext email before click

      // Click on the primary contact reveal target
      const revealed = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('p, span, div')).filter(
          (e) => e.textContent?.trim() === 'Click to reveal'
        );
        const el = elements[elements.length - 1];
        if (el) {
          const clickable = el.closest('[class*="cursor-pointer"]') || el;
          clickable.click();
          return true;
        }
        return false;
      });

      expect(revealed).toBe(true);
      await waitForCanvasAnimation(page, 800);

      // Verify email is revealed and actions (Copy, Email) are present
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('Copy');
      expect(bodyText).toContain('Email');
      expect(bodyText).not.toContain('Click to reveal');
    });

    test('Article Reader: GFM Markdown tables and syntax highlighted code blocks', async ({ page, baseUrl }) => {
      const essayUrl = `${baseUrl}/writing/achieving-82-percent-payload-reduction-on-infinite-canvas`;
      await page.goto(essayUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // Verify article tag exists
      const articleExists = await page.evaluate(() => !!document.querySelector('article'));
      expect(articleExists).toBe(true);

      // Verify GFM Markdown table elements
      const tableData = await page.evaluate(() => {
        const table = document.querySelector('table');
        if (!table) return null;
        const ths = Array.from(table.querySelectorAll('th')).map((th) => th.textContent?.trim());
        const trs = Array.from(table.querySelectorAll('tbody tr')).length;
        return { ths, trs };
      });

      expect(tableData).toBeTruthy();
      expect(tableData.ths.length).toBeGreaterThan(1);
      expect(tableData.trs).toBeGreaterThan(0);

      // Verify syntax highlighted code elements
      const hasCodeBlocks = await page.evaluate(() => {
        return document.querySelectorAll('pre code').length > 0;
      });
      expect(hasCodeBlocks).toBe(true);
    });

    test('Article Reader: Mouse drag and arrow keys do not pan or navigate background canvas', async ({ page, baseUrl }) => {
      const essayUrl = `${baseUrl}/writing/achieving-82-percent-payload-reduction-on-infinite-canvas`;
      await page.goto(essayUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // Get initial canvas transform
      const getCanvasTransform = () =>
        page.evaluate(() => {
          const el = document.querySelector('[style*="translate3d"]');
          return el ? el.getAttribute('style') : null;
        });

      const initialTransform = await getCanvasTransform();

      // Perform mouse grab and drag over the reader overlay
      await page.mouse.move(500, 300);
      await page.mouse.down();
      await page.mouse.move(200, 100, { steps: 5 });
      await page.mouse.up();
      await waitForCanvasAnimation(page, 500);

      // Canvas transform must remain unchanged
      const postDragTransform = await getCanvasTransform();
      expect(postDragTransform).toBe(initialTransform);
      expect(page.url()).toContain('/writing/achieving-82-percent-payload-reduction-on-infinite-canvas');

      // Press Arrow keys - should not trigger canvas navigation
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await waitForCanvasAnimation(page, 500);

      expect(page.url()).toContain('/writing/achieving-82-percent-payload-reduction-on-infinite-canvas');
      const finalTransform = await getCanvasTransform();
      expect(finalTransform).toBe(initialTransform);
    });

    test('Travel Stories: Selecting story from list opens DetailedStoryView with Back button', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/travel`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // Click on Japan travel story Read More button
      const clickedStory = await page.evaluate(() => {
        const storyCards = Array.from(document.querySelectorAll('div')).filter(
          (el) => el.textContent?.includes('Cherry Blossoms & Technology') && el.querySelector('button')
        );
        const specificCard = storyCards[storyCards.length - 1];
        if (specificCard) {
          const btn = Array.from(specificCard.querySelectorAll('button')).find((b) =>
            b.textContent?.includes('Read More')
          );
          if (btn) {
            btn.click();
            return true;
          }
        }
        return false;
      });

      expect(clickedStory).toBe(true);
      await waitForCanvasAnimation(page, 1500);

      // Verify DetailedStoryView components (The Full Story, Trip Highlights, Back to Stories button)
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('The Full Story');
      expect(bodyText).toContain('Trip Highlights');
      expect(bodyText).toContain('Back to Stories');

      // Click Back to Stories
      const backClicked = await page.evaluate(() => {
        const backBtn = Array.from(document.querySelectorAll('button')).find((b) =>
          b.textContent?.includes('Back to Stories')
        );
        if (backBtn) {
          backBtn.click();
          return true;
        }
        return false;
      });

      expect(backClicked).toBe(true);
      await waitForCanvasAnimation(page, 1500);

      // Verify returned to stories list
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('Adventures & Memories');
    });
  });
}
