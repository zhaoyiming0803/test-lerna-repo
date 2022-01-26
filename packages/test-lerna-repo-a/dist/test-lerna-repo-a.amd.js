define(['exports'], (function (exports) { 'use strict';

  function repoA() {
      return 'this is repoA';
  }
  repoA.count = -1;

  exports.repoA = repoA;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-a.amd.js.map
