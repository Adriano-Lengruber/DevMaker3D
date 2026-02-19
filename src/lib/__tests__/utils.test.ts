import { cn, formatPrintTime, calculateMaterialCost } from '../utils'

describe('utils', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
      expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3') // eslint-disable-line no-constant-binary-expression
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
    })
  })

  describe('formatPrintTime', () => {
    it('formats print time correctly', () => {
      expect(formatPrintTime(120)).toBe('2h 0min')
      expect(formatPrintTime(90)).toBe('1h 30min')
      expect(formatPrintTime(45)).toBe('0h 45min')
      expect(formatPrintTime(0)).toBe('0h 0min')
    })
  })

  describe('calculateMaterialCost', () => {
    it('calculates material cost correctly', () => {
      expect(calculateMaterialCost(100, 0.05)).toBe(5)
      expect(calculateMaterialCost(200, 0.03)).toBe(6)
      expect(calculateMaterialCost(50, 0.1)).toBe(5)
    })
  })
})