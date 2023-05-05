import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const HomeDisplay = () => {}
describe('App', () => {
  it('The home page should display Weather text', () => {
    const content = 'WEATHER'
    render(<HomeDisplay />)
    const text = screen.getByText(content)
    expect(text).toBeInTheDocument()
  })
})
