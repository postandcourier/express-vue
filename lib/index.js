// @flow
'use strict';

import {Defaults} from './models';
import {
    setupComponentArray,
    renderError,
    renderComponents
} from './utils';

const template = `<!DOCTYPE html>
<html lang="en">
  <head><title>Hello</title></head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>`;

const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const createRenderer = require('vue-server-renderer').createRenderer;
const renderer = createRenderer({template: template});
const fs = require('fs');
const Vue = require('vue');
var vueify = require('vueify').compiler;
const requireFromString = require('require-from-string');
const NodeCache = require('node-cache');
//TODO add cache options via ENV
const myCache = new NodeCache({});

function expressVue(componentPath: string, options: Object, callback: Function) {
    if (!process.env.VUE_CACHE_ENABLED) {
        let defaults = new Defaults(options);
        setupComponentArray(componentPath, defaults).then(promiseArray => {
            Promise.all(promiseArray)
                .then(function(components) {
                    renderComponents(components, defaults, callback);
                })
                .catch(function(error) {
                    renderError(error, callback);
                });
        }).catch(error => {
            renderError(error, callback);
        });
    } else {
        let cacheObject = Object.assign({}, options.data);
        if (options.settings.vue && options.settings.vue.cache && options.settings.vue.cache.ignoredKeys) {
            for (let key of options.settings.vue.cache.ignoredKeys) {
                if (cacheObject[key]) {
                    delete cacheObject[key];
                }
            }
        }

        const cacheKey = componentPath + JSON.stringify(cacheObject);
        myCache.get(cacheKey, (error, cachedString) => {
            if (error) {
                callback(error, null);
            } else if (cachedString) {
                callback(null, cachedString);
            } else {
                let defaults = new Defaults(options);
                setupComponentArray(componentPath, defaults).then(promiseArray => {
                    Promise.all(promiseArray)
                        .then(function(components) {
                            renderComponents(components, defaults, (error, html) => {
                                if (error) {
                                    callback(error);
                                } else {
                                    myCache.set(cacheKey, html, (err, success) => {
                                        if (err) {
                                            callback(err);
                                        } else if (success) {
                                            callback(null, html);
                                        }
                                    });
                                }
                            });
                        })
                        .catch(function(error) {
                            renderError(error, callback);
                        });
                }).catch(error => {
                    renderError(error, callback);
                });
            }
        });
    }
}

function expressVue2(componentPath: string, options: Object, callback: Function) {
    fs.readFile(componentPath, 'utf-8', (err, content) => {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            vueify.compile(content, componentPath, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    console.log(result);
                    const options = {
                        'presets': ['es2015']
                    };
                    const transpiled = require('babel-core').transform(result, options);
                    // console.log(result);
                    const code = requireFromString(result);

                    const app = new Vue({
                        render: h => h(code)
                    });
                    renderer.renderToString(app, (err, html) => {
                        if (err) {
                            console.error(err);
                            callback(err);
                        } else {
                            console.error(html);
                            callback(null, html);
                        }
                    });
                }

            });

        }
    });
}

export {
    expressVue as default,
    expressVue2
};
