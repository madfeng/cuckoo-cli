const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

// [1] fs.readdirSync
// 读取generators目录的内容
// 返回目录中的文件名的数组
// [2] __dirname 总是指向被执行 js 文件的绝对路径，所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2
const generators = fs.readdirSync(`${__dirname}/generators`)
  	.filter(f => !f.startsWith('.'))
  	.map(f => {
  		// 遍历generators下的文件夹名
		// @return 	inquirer choices 列表选项
		// @数据格式  [{value : 'apple', name : 'Apple'}]
	    return {
	      	name: `${f.padEnd(15)}`,
	      	value: f,
	      	short: f
	    };
  	});

const runGenerator = async (generatorPath, {
  	name = '',
  	cwd = process.cwd(),
}) => {
  	return new Promise(resolve => {
	    if (name) {
	    	// @github https://github.com/substack/node-mkdirp
	      	mkdirp.sync(name);
	      	cwd = path.join(cwd, name);
	    }

    	const Generator = require(generatorPath);
    	const generator = new Generator({
	      	name,
	      	env: {
	        	cwd
	      	},
      		resolved: require.resolve(generatorPath),
    	});

    	return generator.run(() => {
	      	if (name) {
		        clipboardy.writeSync(`cd ${name}`);
		        console.log('📋 Copied to clipboard, just use Ctrl+V');
	      	}
      		console.log('✨ File Generate Done');
      		resolve(true);
    	});
  	});
}

const run = async config => {
	// inquirer 一个用户与命令行交互的工具
	// @示例 https://blog.csdn.net/qq_26733915/article/details/80461257
	// @github https://github.com/SBoudrias/Inquirer.js
  	return inquirer.prompt([{
	    name: 'type',
	    message: 'Select the boilerplate type',
	    type: 'list',
	    choices: generators,
	}]).then(answers => {
		return runGenerator(`./generators/${answers.type}`, config);
  	}).catch(e => {
	    console.error(chalk.red(`> Generate failed`), e);
	    process.exit(1);
  	});
}

module.exports = run;