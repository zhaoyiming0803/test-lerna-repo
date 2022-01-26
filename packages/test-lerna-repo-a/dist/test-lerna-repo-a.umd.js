(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.testLernaRepoA = {}));
})(this, (function (exports) { 'use strict';

  function repoA() {
      return 'this is repoA';
  }

  exports.repoA = repoA;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test-lerna-repo-a.umd.js.map
