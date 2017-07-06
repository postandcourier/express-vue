// @flow

function renderer(view: string, data: Object): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!view) {
            reject(new Error('Missing view'));
        }
        if (!data) {
            reject(new Error('Missing data'));
        }

        resolve(JSON.stringify(data, null, 2));
    });
}

module.exports.renderer = renderer;
