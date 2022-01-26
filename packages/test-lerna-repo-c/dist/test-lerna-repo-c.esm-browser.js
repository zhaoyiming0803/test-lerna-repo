import { repoB } from '@test-lerna-repo/test-lerna-repo-b';

function repoC() {
    console.log('run in repoc: ', repoB());
}
repoC.count = -1;

export { repoC };
//# sourceMappingURL=test-lerna-repo-c.esm-browser.js.map
