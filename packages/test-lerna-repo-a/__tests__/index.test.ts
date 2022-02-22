import { repoA } from '../src'

describe('test repoA', () => {
  test('run repoA fn', async () => {
    const count = repoA.count
    const res = await repoA('hello')
    expect(res).toBe('hello-this is async')
    expect(repoA.count).toBe(count + 1)
  })
})
