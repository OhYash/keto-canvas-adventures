import { describe, test, expect, waitForCanvasAnimation, getBodyText, pressKey } from '../harness.js';

export function registerNavigationTests() {
  describe('2D Canvas Discrete Grid Keyboard Navigation', () => {
    test('Horizontal Right Navigation: Home (0,0) -> Work (1,0) -> Writing (2,0) -> Home', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // ArrowRight -> Work
      await pressKey(page, 'ArrowRight', 1500);
      expect(page.url()).toContain('/work');
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('Most Recent Role');

      // ArrowRight -> Writing
      await pressKey(page, 'ArrowRight', 1500);
      expect(page.url()).toContain('/writing');
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('Writing & Essays');

      // ArrowLeft -> Work
      await pressKey(page, 'ArrowLeft', 1500);
      expect(page.url()).toContain('/work');

      // ArrowLeft -> Home
      await pressKey(page, 'ArrowLeft', 1500);
      expect(page.url()).toBe(`${baseUrl}/`);
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('I own backend systems end-to-end');
    });

    test('Horizontal Left Navigation: Home (0,0) -> Personal (-1,0) -> Travel (-2,0) -> Home', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // ArrowLeft -> Personal
      await pressKey(page, 'ArrowLeft', 1500);
      expect(page.url()).toContain('/personal');
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('About Me');

      // ArrowLeft -> Travel
      await pressKey(page, 'ArrowLeft', 1500);
      expect(page.url()).toContain('/travel');
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('Travel Stories');

      // ArrowRight -> Personal
      await pressKey(page, 'ArrowRight', 1500);
      expect(page.url()).toContain('/personal');

      // ArrowRight -> Home
      await pressKey(page, 'ArrowRight', 1500);
      expect(page.url()).toBe(`${baseUrl}/`);
    });

    test('Vertical Up Navigation: Home (0,0) -> Keto (0,-1) -> Ataco (0,-2) -> Home', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // ArrowUp -> Keto
      await pressKey(page, 'ArrowUp', 1500);
      expect(page.url()).toContain('/keto');
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('All About Keto');

      // ArrowUp -> Ataco
      await pressKey(page, 'ArrowUp', 1500);
      expect(page.url()).toContain('/ataco');
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('The Ataco File');

      // ArrowDown -> Keto
      await pressKey(page, 'ArrowDown', 1500);
      expect(page.url()).toContain('/keto');

      // ArrowDown -> Home
      await pressKey(page, 'ArrowDown', 1500);
      expect(page.url()).toBe(`${baseUrl}/`);
    });

    test('Vertical Down Navigation: Home (0,0) -> Hobbies (0,1) -> Projects (0,2) -> Home', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      // ArrowDown -> Hobbies
      await pressKey(page, 'ArrowDown', 1500);
      expect(page.url()).toContain('/hobbies');
      let bodyText = await getBodyText(page);
      expect(bodyText).toContain('My Hobbies');

      // ArrowDown -> Projects
      await pressKey(page, 'ArrowDown', 1500);
      expect(page.url()).toContain('/projects');
      bodyText = await getBodyText(page);
      expect(bodyText).toContain('Featured Projects');

      // ArrowUp -> Hobbies
      await pressKey(page, 'ArrowUp', 1500);
      expect(page.url()).toContain('/hobbies');

      // ArrowUp -> Home
      await pressKey(page, 'ArrowUp', 1500);
      expect(page.url()).toBe(`${baseUrl}/`);
    });

    test('Clicking top breadcrumb Home button navigates back to (0,0)', async ({ page, baseUrl }) => {
      await page.goto(`${baseUrl}/work`, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1500);

      const clicked = await page.evaluate(() => {
        const homeLink = Array.from(document.querySelectorAll('a, button')).find((el) =>
          el.textContent?.includes('Home')
        );
        if (homeLink) {
          homeLink.click();
          return true;
        }
        return false;
      });

      expect(clicked).toBe(true);
      await waitForCanvasAnimation(page, 1500);
      expect(page.url()).toBe(`${baseUrl}/`);
    });
  });
}
