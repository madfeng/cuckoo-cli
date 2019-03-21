const Generator = require('yeoman-generator');
const glob = require('glob');
const { statSync } = require('fs');
const { basename } = require('path');

function noop() {
  	return true;
}

class BasicGenerator extends Generator {

	constructor(opts) {
    	super(opts);
    	this.opts = opts;
    	this.name = basename(opts.env.cwd);
  	}

  	writeFiles({ context, filterFiles = noop }) {
  		glob.sync('**/*', {
	        cwd: this.templatePath(),
	        dot: true
      	})
      	.filter(filterFiles)
      	.forEach(file => {
			const filePath = this.templatePath(file);
			if (statSync(filePath).isFile()) {
				// 在Yeoman-generator里，需要的模板文件默认放在templates文件夹里,所有文件相关的操作通过this.fs对象来实现
				// https://github.com/sboudrias/mem-fs-editor
				// this.fs.copyTpl就是我们用来拷贝渲染好的模板文件的方法
				// 需要输入三个参数：模板源路径、需要拷贝到的项目路径、模板渲染内容对象
				// 模板的渲染是基于ejs模板引擎的语法
	          	this.fs.copyTpl(
		            this.templatePath(filePath),
		            this.destinationPath(file.replace(/^_/, '.')),
		            context
	          	);
	        }
      	})
  	}
}