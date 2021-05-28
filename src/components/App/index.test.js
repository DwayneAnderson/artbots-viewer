import { render, screen } from '@testing-library/react'
import App from '.'

test('renders loading screen', () => {
  render(<App />)
  const linkElement = screen.getByText(/loading/i)
  expect(linkElement).toBeInTheDocument()
})
