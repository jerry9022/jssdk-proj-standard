const semver = require('semver');
const chalk = require('chalk');
/**
 * Check if Node version meets app requirement.
 */
module.exports = function checkEnv(pkg) {
  const requiredVersion = pkg.engines.node;
  if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(
      chalk.red(
        `\n[${pkg.name}] minimum Node version not met:` +
          `\nYou are using Node ${process.version}, but ${pkg.name} ` +
          `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
      )
    );
    process.exit(1);
  }
};
