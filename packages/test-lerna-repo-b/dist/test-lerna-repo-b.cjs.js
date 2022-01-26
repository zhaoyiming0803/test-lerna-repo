'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var testLernaRepoA = require('@test-lerna-repo/test-lerna-repo-a');

function sum(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return `a: ${a}, b: ${b}`;
}

console.log('repoA name: ', testLernaRepoA.repoA());
console.log(sum(1, 2));
console.log(sum('1', '2'));
function repoB() {
    return 'this is repoB';
}

exports.repoB = repoB;
//# sourceMappingURL=test-lerna-repo-b.cjs.js.map
