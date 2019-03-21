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
