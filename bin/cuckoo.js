#! /usr/bin/env node
const yParser = require('yargs-parser');
const semver = require('semver');

const program = require('commander');
const package = require('../package.json');
const ora = require('ora');
const chalk = require('chalk');

// const script = process.argv[2];
// const args = process.argv.slice(3);

const args = yParser(process.argv.slice(2));
const script = args._[0];
const project = args._[1];

program
  .version(package.version)
  .usage('cuckoo <command>')
  .parse(process.argv);

program.command('new (template)')
  .description("create a project")
  .action(function(template){

  })

if (!semver.satisfies(process.version, '>= 7.0.0')) {
  	console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  	process.exit(1);
}

switch(script) {

  case 'new' :

    break;

  default :
    program.help();
    break;
}
