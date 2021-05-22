require('./models');
const { ApolloServer } = require('apollo-server');
const { verify } = require('jsonwebtoken');


const apolloServer = new ApolloServer({
    schema: require('./graphQL'),
    tracing: true,
    context: async ({ req }) => {
        try {
            const Token = req.headers.authorization.split(' ')[1];
            const { email } = await verify(Token, "mongoDB");
            return { email }
        } catch (error) {
            return { message: error.message };
        }
    }
}).listen()
    .then(({ url }) => {
        console.log(`🚀 ${url}`);
    });