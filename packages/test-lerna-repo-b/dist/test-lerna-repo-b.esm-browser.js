import { repoA } from '@test-lerna-repo/test-lerna-repo-a';

function sum(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return `a: ${a}, b: ${b}`;
}

console.log('repoA name: ', repoA());
console.log(sum(1, 2));
console.log(sum('1', '2'));
function repoB() {
    return 'this is repoB';
}
repoB.count = -1;

export { repoB };
//# sourceMappingURL=test-lerna-repo-b.esm-browser.js.map
