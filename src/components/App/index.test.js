import { render, screen } from '@testing-library/react'
import App from '.'

test('renders loading screen', () => {
  render(<App />)
  const title = screen.getByText('ArtBots Viewer', { exact: false })
  expect(title).toBeInTheDocument()
})
