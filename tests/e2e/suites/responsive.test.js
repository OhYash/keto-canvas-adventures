import { describe, test, expect, waitForCanvasAnimation, getBodyText } from '../harness.js';

export function registerResponsiveTests() {
  describe('Responsive Viewports & Screen Layouts', () => {
    const viewports = [
      { name: 'Desktop 1080p', width: 1920, height: 1080 },
      { name: 'Laptop 768p', width: 1366, height: 768 },
      { name: 'Tablet (iPad)', width: 768, height: 1024 },
      { name: 'Mobile (iPhone)', width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      test(`Renders layout and canvas smoothly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page, baseUrl }) => {
        await page.setViewport({ width: vp.width, height: vp.height });
        await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
        await waitForCanvasAnimation(page, 1200);

        // Check Home headline is visible
        const homeText = await getBodyText(page);
        expect(homeText).toContain('I own backend systems end-to-end');

        // Check active card bounding box is rendered within reasonable viewport bounds
        const cardDimensions = await page.evaluate(() => {
          const card = document.querySelector('.animate-expand-card, main, [class*="max-w-"]');
          if (!card) return null;
          const rect = card.getBoundingClientRect();
          return { width: rect.width, height: rect.height, visible: rect.width > 0 && rect.height > 0 };
        });

        expect(cardDimensions).toBeTruthy();
        expect(cardDimensions.visible).toBe(true);

        // Test navigating to /work at this viewport
        await page.goto(`${baseUrl}/work`, { waitUntil: 'domcontentloaded' });
        await waitForCanvasAnimation(page, 1200);

        const workText = await getBodyText(page);
        expect(workText).toContain('Most Recent Role');
      });
    }
  });
}
