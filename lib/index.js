// @flow
'use strict';
const Utils = require('./utils');

function middleware(req: Object, res: Object, next: Function) {
    res.renderVue = function(view: string, data: Object) {
        Utils.renderer(view, data)
            .then(renderedString => {
                res.set('Content-Type', 'text/html');
                res.write(renderedString);
                res.end();
            })
            .catch(error => {
                return next(error);
            });
    };
    next();
}

function init(options: Object) {
    console.warn(options);
    return middleware;
}

module.exports.init = init;
module.exports.expressVue = middleware;
