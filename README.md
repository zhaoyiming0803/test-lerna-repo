# test-lerna-repo

https://github.com/lerna/lerna

use npm to publish a package, must not set `publish` as a key to `scripts` in package.json.

use command `lerna link` . Symlink together all Lerna packages that are dependencies of each other in the current Lerna repo. Need not to install other Lerna repo by npm.

### issue

https://github.com/lerna/lerna/issues/3068