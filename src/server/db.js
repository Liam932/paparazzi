const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

const { host, port, name } = config.mongo;
let db;

async function connect() {
  logger.info('Connection intialisation');
  db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
  mongoose.connection.on('connecting', () => logger.info('MONGO: Connecting to mongo ....'));
  mongoose.connection.on('connected', () => logger.info('MONGO: Connected to mongo'));
  mongoose.connection.on('disconnecting', () => logger.info('MONGO: Disconnecting to mongo .... '));
  mongoose.connection.on('disconnected', () => logger.info('MONGO: disconnected from mongo'));
  mongoose.connection.on('error', args => logger.error('MONGO: Mongoose connection error:', ...args));
  mongoose.connection.on('reconnected', () => logger.info('MONGO: Mongoose reconnected'));
}

module.exports = {
  connect,
  db,
};
