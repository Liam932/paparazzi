const winston = require('winston');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const consoleTransport = new winston.transports.Console({
  level: LOG_LEVEL,
  handleExceptions: true,
  prettyPrint: true,
  colorize: process.stdout.isTTY,
});

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [consoleTransport],
});

logger.stream = {
  write: message => logger.info(message),
};


module.exports = logger;
