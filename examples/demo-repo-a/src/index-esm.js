import { repoA } from '@test-lerna-repo/test-lerna-repo-a'

const count = repoA.count

console.log(repoA('hello, my name is zhaoyiming'))
console.log(repoA.count === count + 1)
