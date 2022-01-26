var testLernaRepoC = (function (exports, testLernaRepoB) {
  'use strict';

  function repoC() {
      console.log('run in repoc: ', testLernaRepoB.repoB());
  }

  exports.repoC = repoC;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, testLernaRepoB);
//# sourceMappingURL=test-lerna-repo-c.global.js.map
