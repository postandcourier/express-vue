// @flow
var Scope = require('../models').Scope;

function defaultData(req): Object {
    return {
        error       : null,
        user        : req.session.passport && req.session.passport.user ? req.session.passport.user.profile : null
    };
}
const defaultVue = {
    head: {
        title: 'Tidal',
    }
};

function defaultScope(req: Object, res: Object, next: Function) {
    let scope = new Scope(defaultData(req), defaultVue);
    req.scope = scope;

    next();
}

function init(config: Object = {}) {
    return function _defaultScope(req: Object, res: Object, next: Function) {
        let scope = new Scope(config.data, config.vue);
        req.scope = scope;

        next();
    };
}

module.exports.init = init;
module.exports.defaultScope = defaultScope;
