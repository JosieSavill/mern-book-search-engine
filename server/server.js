const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');


const app = express();
const PORT = process.env.PORT || 3001; 

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// added code below from mini project solved, may not need:
app.get('./', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build.index.html'));
});

// added const startApolloServer from mini proj:
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });


// this app.use was here, is it needed?
app.use(routes);


// this code added below is what is in mini project:
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })

})
};


// added:
startApolloServer();
