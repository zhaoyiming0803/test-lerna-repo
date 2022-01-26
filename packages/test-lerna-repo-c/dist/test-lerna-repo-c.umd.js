(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@test-lerna-repo/test-lerna-repo-b')) :
  typeof define === 'function' && define.amd ? define(['exports', '@test-lerna-repo/test-lerna-repo-b'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.testLernaRepoC = {}, global.testLernaRepoB));
})(this, (function (exports, testLernaRepoB) { 'use strict';

  function repoC() {
      console.log('run in repoc: ', testLernaRepoB.repoB());
  }

  exports.repoC = repoC;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-c.umd.js.map
