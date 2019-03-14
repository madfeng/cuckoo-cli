const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk');

const errorMsg = 'Existing directory here, please run new command for an empty folder!';

module.exports = function generate(project) {
	// process.cwd() 方法返回 Node.js 进程的当前工作目录
	const projectPath = path.join(process.cwd(), project);
	
	// 当前目录下工程已存在
	if(fs.existsSync(projectPath)) {
		console.error(chalk.red(errorMsg));
		process.exit(1);
	} 
	
	fse.mkdirpSync(projectPath);

}