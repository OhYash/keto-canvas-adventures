import { registerSSGTests } from './suites/ssg.test.js';
import { registerRoutesTests } from './suites/routes.test.js';
import { registerNavigationTests } from './suites/navigation.test.js';
import { registerInteractionsTests } from './suites/interactions.test.js';
import { registerResponsiveTests } from './suites/responsive.test.js';

export function registerAllSuites() {
  registerSSGTests();
  registerRoutesTests();
  registerNavigationTests();
  registerInteractionsTests();
  registerResponsiveTests();
}

export * from './harness.js';
