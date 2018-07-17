const mongoose = require('mongoose');
const config = require('config');

const { host, port, name } = config.mongo;

const db = mongoose.connect(`mongodb://${host}:${port}/${name}`);

module.exports = {
    db
};
