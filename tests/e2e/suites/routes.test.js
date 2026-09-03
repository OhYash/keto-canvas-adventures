import { describe, test, expect, waitForCanvasAnimation, getBodyText, getHeadingTexts } from '../harness.js';
import { SECTIONS } from '../../../src/data/sections.ts';
import { travelStories } from '../../../src/data/travelStories.ts';

export function registerRoutesTests() {
  describe('Direct Route Loading & Deep-Linking', () => {
    // Canonical sections content expectations
    const sectionExpectations = {
      home: 'I own backend systems end-to-end',
      work: 'Most Recent Role',
      writing: 'Writing & Essays',
      personal: 'About Me',
      travel: 'Travel Stories',
      keto: 'All About Keto',
      ataco: 'The Ataco File',
      hobbies: 'My Hobbies',
      projects: 'Featured Projects',
      now: 'Currently',
      contact: "Let's Talk",
    };

    for (const section of SECTIONS) {
      test(`Direct URL loads canonical section: ${section.id} (${section.seo.path})`, async ({ page, baseUrl }) => {
        const targetUrl = `${baseUrl}${section.seo.path}`;
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
        await waitForCanvasAnimation(page, 1400);

        // Check document title matches canonical SEO title
        const pageTitle = await page.title();
        expect(pageTitle).toBe(section.seo.title);

        // Check expected body text
        const bodyText = await getBodyText(page);
        const expected = sectionExpectations[section.id] || section.title;
        expect(bodyText).toContain(expected);

        // Verify active <h1> element is present and exactly one exists
        const h1s = await getHeadingTexts(page, 'h1');
        expect(h1s.length).toBe(1);
      });
    }

    test('Direct URL loads dynamic travel story: /travel/japan-2023', async ({ page, baseUrl }) => {
      const targetUrl = `${baseUrl}/travel/japan-2023`;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1400);

      const bodyText = await getBodyText(page);
      expect(bodyText).toContain('Cherry Blossoms & Technology');
      expect(bodyText).toContain('Tokyo & Kyoto');

      const h1s = await getHeadingTexts(page, 'h1');
      expect(h1s.length).toBe(1);
    });

    test('Direct URL loads dynamic travel story: /travel/iceland-2022', async ({ page, baseUrl }) => {
      const targetUrl = `${baseUrl}/travel/iceland-2022`;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1400);

      const bodyText = await getBodyText(page);
      expect(bodyText).toContain('Land of Fire & Ice');
      expect(bodyText).toContain('Northern Lights');

      const h1s = await getHeadingTexts(page, 'h1');
      expect(h1s.length).toBe(1);
    });

    test('Direct URL loads dynamic blog essay: /writing/achieving-82-percent-payload-reduction-on-infinite-canvas', async ({ page, baseUrl }) => {
      const targetUrl = `${baseUrl}/writing/achieving-82-percent-payload-reduction-on-infinite-canvas`;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1400);

      const bodyText = await getBodyText(page);
      expect(bodyText).toContain('Payload Reduction');
      expect(bodyText).toContain('Discrete 2D Integer Grid');

      const h1s = await getHeadingTexts(page, 'h1');
      expect(h1s.length).toBe(1);
    });

    test('Direct URL loads dynamic blog essay: /writing/building-an-infinite-canvas-portfolio', async ({ page, baseUrl }) => {
      const targetUrl = `${baseUrl}/writing/building-an-infinite-canvas-portfolio`;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1400);

      const bodyText = await getBodyText(page);
      expect(bodyText).toContain('Infinite Canvas');

      const h1s = await getHeadingTexts(page, 'h1');
      expect(h1s.length).toBe(1);
    });

    test('Direct URL loads dynamic blog essay: /writing/inr-finance-compass-build-log', async ({ page, baseUrl }) => {
      const targetUrl = `${baseUrl}/writing/inr-finance-compass-build-log`;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await waitForCanvasAnimation(page, 1400);

      const bodyText = await getBodyText(page);
      expect(bodyText).toContain('INR Finance Compass');

      const h1s = await getHeadingTexts(page, 'h1');
      expect(h1s.length).toBe(1);
      expect(h1s[0]).toContain('Building INR Finance Compass');
    });
  });
}
