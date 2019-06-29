const isDev = require('electron-is-dev');

const APP_ROOT = '../..';
const RESOURCES_ROOT = '../../../../resources'
const RESOURCES = {
    'events.json': {
        'dev': `${APP_ROOT}/../events.json`,
        'prod': `${RESOURCES_ROOT}/events.json`
    }
}

function requireResource(resourceName) {
    const resource = RESOURCES[resourceName];

    if (!resource) {
        throw new Error(`Cannot find resource '${resourceName}'`);
    }

    if (isDev) {
        return require(resource.dev);
    }

    return require(resource.prod);
}

module.exports = {
    require: requireResource
};
