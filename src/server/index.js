const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const morgan = require('morgan');

const logger = require('./logger');
const schema = require('./schema');
const { connect } = require('./db');

connect();
const app = express();

app.use(morgan('dev', { stream: logger.stream }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(config.port, () => {
  logger.info(`🚀 Server ready on port ${config.port} at graphql`);
});
