define(['exports', '@test-lerna-repo/test-lerna-repo-b'], (function (exports, testLernaRepoB) { 'use strict';

  function repoC() {
      console.log('run in repoc: ', testLernaRepoB.repoB());
  }
  repoC.count = -1;

  exports.repoC = repoC;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-c.amd.js.map
