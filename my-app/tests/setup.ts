import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Next/Image mock → plain img without JSX (avoid esbuild JSX error)
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const React = require('react');
    return React.createElement('img', props);
  },
}));

