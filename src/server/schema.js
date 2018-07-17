const { schemaComposer } = require('graphql-compose');

require('./image/image.graphql');

module.exports = schemaComposer.buildSchema();
