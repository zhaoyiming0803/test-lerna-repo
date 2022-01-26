define(['exports', '@test-lerna-repo/test-lerna-repo-a'], (function (exports, testLernaRepoA) { 'use strict';

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
  repoB.count = -1;

  exports.repoB = repoB;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-b.amd.js.map
