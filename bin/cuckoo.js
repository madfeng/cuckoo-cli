#! /usr/bin/env node
const yParser = require('yargs-parser');
const semver = require('semver');

const program = require('commander');
const package = require('../package.json');
const chalk = require('chalk');

const args = yParser(process.argv.slice(2));
const script = args._[0] || 0;
const project = args._[1];

const run = require('../lib/run.js');

program
    .version(package.version)
    .usage('<command>');

program
    .command('new (template)')
    .description("create a project");

program.parse(process.argv);

if (!semver.satisfies(process.version, '>= 7.0.0')) {
  	console.error(chalk.red('✘ The generator will only work with Node v7.0.0 and up!'));
  	process.exit(1);
}

switch(script) {
    case 'new' :
        run({name : project});
        break;
    default :
        program.help();
        break;
}
