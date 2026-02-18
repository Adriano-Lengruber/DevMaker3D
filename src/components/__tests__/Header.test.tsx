import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('DevMaker3D')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<Header />)
    
    const navItems = ['Sobre', 'Processo', 'Serviços', 'Materiais', 'Portfólio', 'Contato']
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('renders CTA button', () => {
    render(<Header />)
    const ctaButton = screen.getByText('Solicitar Orçamento')
    expect(ctaButton).toBeInTheDocument()
  })

  it('has correct href for CTA button', () => {
    render(<Header />)
    const ctaButton = screen.getByText('Solicitar Orçamento')
    expect(ctaButton).toHaveAttribute('href', '#contact')
  })
})