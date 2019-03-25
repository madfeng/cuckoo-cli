const chalk = require('chalk');
const BasicGenerator = require('../../BasicGenerator.js');

class Vortex extends BasicGenerator {

	async writing() {
	    // const path = this.opts.name || './';
	    // const gitArgs = [
	    //   	`clone`,
	    //   	`https://github.com/umijs/create-umi.git`,
	    //   	`--depth=1`,
	    //   	path
	    // ];
	    // console.log(`${chalk.gray('>')} git ${gitArgs.join(' ')}`);
	    // await require('execa')(
	    //  	`git`,
	    //   	gitArgs,
	    // );
	    const path = this.opts.name || './';
	    const gitArgs = [
	      	`checkout`,
	      	`https://github.com/yukinight/vtx-cli/trunk/boilerplates/app`,
	      	path
	    ];
	    console.log(`${chalk.gray('>')} svn ${gitArgs.join(' ')}`);
	    await require('execa')(
	     	`svn`,
	      	gitArgs,
	    );
  	}

}

module.exports = Vortex;