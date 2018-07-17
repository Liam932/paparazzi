const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const { ApolloServer } = require('apollo-server-express');
const gql = require('graphql-tag');

const schema = require('./schema');
const { connect } = require('./db');

connect()

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(config.port, () => {
    console.log(`🚀 Server ready on port ${config.port} at graphql`);
});
