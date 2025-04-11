const semver = require('semver');
const { writeFileSync } = require('fs');
const packageJson = require('../../package.json');

const log = message => console.log(`--> ${message}`);

// Create the new version based on the one in package.json
const newVersion = semver.inc(packageJson.version, process.argv[2], 'alpha');

// Write the new version to the package.json file
packageJson.version = newVersion;
writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));

log(`Upgraded ${packageJson.name} package to ${packageJson.version}`);
log(`To publish a canary version for testing, run the Canary action in Github:
    
    https://github.com/Perry-Weather/component-library/actions

Once completed, downstream apps that use this library can use this version by running:

    yarn upgrade ${packageJson.name}@${packageJson.version}

Or by updating the dependency in the package.json directly:

    "${packageJson.name}": "${packageJson.version}"

And then running:

    yarn install
`);
