var testLernaRepoC = (function (exports, testLernaRepoB) {
  'use strict';

  function repoC() {
      console.log('run in repoc: ', testLernaRepoB.repoB());
  }
  repoC.count = -1;

  exports.repoC = repoC;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, testLernaRepoB);
//# sourceMappingURL=test-lerna-repo-c.global.js.map
