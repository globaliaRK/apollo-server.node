const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");
const { addResolversToSchema } = require("@graphql-tools/schema");
const { UrlLoader } = require("@graphql-tools/url-loader");
const resolvers = require("./resolvers");

const schema = loadSchemaSync(__dirname + '/schema/*.graphql', {
    loaders: [new GraphQLFileLoader(), new UrlLoader]
});
module.exports = addResolversToSchema({ schema, resolvers, });
