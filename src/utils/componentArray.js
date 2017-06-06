// @flow
const Models = require('../models');
const Parser = require('../parser');
const getCorrectPathForFile = require('./checkPathUtils').getCorrectPathForFile;

let types = new Models.Types();

function setupComponentArray(componentPath: string, defaults: Models.Defaults) {
    let array = [];
    array.push(Parser.layoutParser(defaults.layoutPath, defaults, types.LAYOUT));
    array.push(Parser.componentParser(getCorrectPathForFile(componentPath, 'view'), defaults, types.COMPONENT));

    if (defaults.options.vue && defaults.options.vue.components) {
        for (var component in defaults.options.vue.components) {
            if (defaults.options.vue.components.hasOwnProperty(component)) {
                const componentFile = defaults.componentsDir + defaults.options.vue.components[component] + '.vue';
                array.push(Parser.componentParser(getCorrectPathForFile(componentFile, 'component'), defaults, types.SUBCOMPONENT));
            }
        }
    }
    return array;
}

module.exports = setupComponentArray;
