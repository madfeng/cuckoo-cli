const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {

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
