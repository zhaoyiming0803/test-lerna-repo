# test-lerna-repo

https://github.com/lerna/lerna

***

use npm to publish a package, must not set `publish` as a key to `scripts` in package.json.

***

use command `lerna link` . Symlink together all Lerna packages that are dependencies of each other in the current Lerna repo. Need not to install other Lerna repo by npm.

***

npm version is better be >= 16.13.1, otherwise:

- Add `dist` to `.gitignore`, and add `dist` to `files` in `package.json`, `dist` can not be published to npm by lerna publish
