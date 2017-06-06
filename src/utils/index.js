const Render = require('./render');
const scriptToString = require('./string');
const headUtil = require('./head');
const setupComponentArray = require('./componentArray');
const renderError = require('./renderError');
const renderComponents = require('./renderComponents');
const PathUtils = require('./checkPathUtils');


module.exports.renderUtil = Render.renderUtil;
module.exports.layoutUtil = Render.layoutUtil;
module.exports.renderHtmlUtil = Render.renderHtmlUtil;
module.exports.renderVueComponents = Render.renderVueComponents;
module.exports.renderVueMixins = Render.renderVueMixins;
module.exports.scriptToString = scriptToString;
module.exports.headUtil = headUtil;
module.exports.setupComponentArray = setupComponentArray;
module.exports.renderError = renderError;
module.exports.renderComponents = renderComponents;
module.exports.getParamCasePath = PathUtils.getParamCasePath;
module.exports.getCorrectPathForFile = PathUtils.getCorrectPathForFile;
