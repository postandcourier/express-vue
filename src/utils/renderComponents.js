// @flow
const renderError = require('./renderError');
const renderHtmlUtil = require('./render').renderHtmlUtil;
const Defaults = require('../models').Defaults;

function renderComponents(components: Object, defaults: Defaults, callback: Function) {
    renderHtmlUtil(components, defaults).then(function(html) {
        callback(null, html);
    })
    .catch(function(error) {
        renderError(error, callback);
    });
}

export default renderComponents;
