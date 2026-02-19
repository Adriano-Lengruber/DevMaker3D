import '@testing-library/jest-dom'
import React from 'react'

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string): R
      toHaveTextContent(text: string): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
    }
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
const mockResizeObserver = jest.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.ResizeObserver = mockResizeObserver;

// Mock scrollTo
window.scrollTo = jest.fn()

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
    h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
    h3: ({ children, ...props }: any) => React.createElement('h3', props, children),
    p: ({ children, ...props }: any) => React.createElement('p', props, children),
    span: ({ children, ...props }: any) => React.createElement('span', props, children),
    a: ({ children, ...props }: any) => React.createElement('a', props, children),
    button: ({ children, ...props }: any) => React.createElement('button', props, children),
    section: ({ children, ...props }: any) => React.createElement('section', props, children),
    nav: ({ children, ...props }: any) => React.createElement('nav', props, children),
    header: ({ children, ...props }: any) => React.createElement('header', props, children),
  },
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  useInView: () => ({ inView: true }),
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
  useSpring: () => ({ get: () => 0 }),
}));

// Mock next/dynamic
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => null,
}));

// Mock three.js related modules
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => React.createElement('div', { 'data-testid': 'canvas-mock' }, children),
  useFrame: jest.fn(),
  useThree: jest.fn(() => ({ camera: {}, gl: {}, scene: {} })),
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Stars: () => null,
  Text: () => null,
}));

// Environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_NAME = 'DevMaker3D'
process.env.RESEND_API_KEY = 'test-api-key'
process.env.RESEND_FROM_EMAIL = 'test@devmaker3d.com.br'