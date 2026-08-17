import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import AppShell from './AppShell';

export { SECTION_ROUTES, SECTION_SITEMAP_CONFIGS, SECTIONS } from './data/sections';
export { travelStories } from './data/travelStories';

export function render(url: string) {
  const helmetContext = {} as FilledContext;
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  return { html, helmet };
}
