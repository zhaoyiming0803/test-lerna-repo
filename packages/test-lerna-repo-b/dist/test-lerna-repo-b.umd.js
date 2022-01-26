(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@test-lerna-repo/test-lerna-repo-a')) :
  typeof define === 'function' && define.amd ? define(['exports', '@test-lerna-repo/test-lerna-repo-a'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.testLernaRepoB = {}, global.testLernaRepoA));
})(this, (function (exports, testLernaRepoA) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-b.umd.js.map
