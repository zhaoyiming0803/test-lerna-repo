import { repoB } from '@test-lerna-repo/test-lerna-repo-b';

function repoC() {
    console.log('run in repoc: ', repoB());
}

export { repoC };
//# sourceMappingURL=test-lerna-repo-c.esm-bundler.js.map
