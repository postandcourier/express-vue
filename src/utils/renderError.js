// @flow

function renderError(error: string, callback: Function) {
    console.error(error);
    callback(new Error(error));
}

module.exports = renderError;
