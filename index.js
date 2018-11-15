const core = require('./src/core');
const math = require('./src/math');
const properties = require('./src/properties');
const time = require('./src/time');
const ta = require('./src/ta');

module.exports = {
    ...core,
    ...math,
    ...properties,
    ...time,
    ...ta
};
