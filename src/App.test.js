import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /negative viewer/i });
  expect(headingElement).toBeInTheDocument();
});
