const mongoose = require('mongoose');
const config = require('config');
const { host, port, name } = config.mongo;
let db;

async function connect() {
    db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
    mongoose.connection.on('connecting', () => console.info('MONGO: Connecting to mongo ....'));
    mongoose.connection.on('connected', () => console.info('MONGO: Connected to mongo'));
    mongoose.connection.on('disconnecting', () => console.info('MONGO: Disconnecting to mongo .... '));
    mongoose.connection.on('disconnected', () => console.info('MONGO: disconnected from mongo'));
    mongoose.connection.on('error', args => console.error('MONGO: Mongoose connection error:', ...args));
    mongoose.connection.on('reconnected', () => console.info('MONGO: Mongoose reconnected'));
}

module.exports = {
    connect,
    db
};
