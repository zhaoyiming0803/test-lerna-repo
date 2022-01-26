'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var testLernaRepoB = require('@test-lerna-repo/test-lerna-repo-b');

function repoC() {
    console.log('run in repoc: ', testLernaRepoB.repoB());
}
repoC.count = -1;

exports.repoC = repoC;
//# sourceMappingURL=test-lerna-repo-c.cjs.js.map
