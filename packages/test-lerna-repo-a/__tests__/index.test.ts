import { repoA } from '../src'

describe('test repoA', () => {
  test('run repoA fn', () => {
    const count = repoA.count
    expect(repoA('hello')).toBe('hello')
    expect(repoA.count).toBe(count + 1)
  })
})
