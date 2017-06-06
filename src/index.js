// @flow
'use strict';
const Models = require('./models');
const Middleware = require('./middleware');
const Utils = require('./utils');

let promiseArray = [];

function expressVue(componentPath: string, options: Object, callback: Function) {

    let defaults = new Models.Defaults(options);
    promiseArray = Utils.setupComponentArray(componentPath, defaults);

    Promise.all(promiseArray)
    .then(function(components) {
        Utils.renderComponents(components, defaults, callback);
    })
    .catch(function(error) {
        Utils.renderError(error, callback);
    });
}

module.exports.init = Middleware.init;
module.exports.defaultScope = Middleware.defaultScope;
exports.expressVue = expressVue;
