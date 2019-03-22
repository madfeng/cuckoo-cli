/**
 * prompting方法是用来获取用户输入
 * writing方法是根据用户输入内容生成模板文件。
 * 模板生成器的一般原理是用获取的配置信息渲染好模板，再拷贝到项目目录对应的位置。
 * 所以，在writing方法里面，需要实现模板渲染和拷贝。
 * 在Yeoman-generator里，需要的模板文件默认放在templates文件夹里，所有文件相关的操作通过this.fs对象来实现。
 */
const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {

    prompting() {
        const prompts = [
            
        ];
        return this.prompt(prompts).then(props => {
            this.prompts = props;
        });
    }

    writing() {
        this.writeFiles({
            context: {
                name: this.name,
                ...this.prompts,
            },
            filterFiles: f => {
                return true;
            }
        });
    }
}

module.exports = Generator;
