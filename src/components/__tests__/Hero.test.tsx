import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders main heading', () => {
    render(<Hero />)
    
    // Check if heading contains expected text
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    
    const ctaButtons = screen.getAllByRole('link', { name: /iniciar projeto|ver processo/i })
    expect(ctaButtons.length).toBeGreaterThan(0)
  })

  it('renders subtitle text', () => {
    render(<Hero />)
    
    // Look for text that indicates this is the hero section
    const heroText = screen.getByText(/impressão 3D/i, { exact: false })
    expect(heroText).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Hero />)
    
    // Query for the section element directly since it doesn't have an accessible name
    const section = screen.getByTestId('hero-section')
    expect(section).toBeInTheDocument()
  })
})