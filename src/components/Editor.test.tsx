import React from 'react';
import { render, screen } from '@testing-library/react';
import Editor from './Editor';

test('renders Standard Notes documentation link', () => {
  render(<Editor />);
  const linkElement = screen.getByText(/Standard Notes documentation/i);
  expect(linkElement).toBeInTheDocument();
});
