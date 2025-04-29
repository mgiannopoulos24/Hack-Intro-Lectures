import '@testing-library/jest-dom';

// Suppress React Router warnings during tests
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  // Filter out React Router future flag warnings
  if (
    args[0]?.includes &&
    (args[0].includes('React Router Future Flag Warning') ||
      args[0].includes('v7_startTransition') ||
      args[0].includes('v7_relativeSplatPath') ||
      args[0].includes('aria-describedby={undefined}'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};
