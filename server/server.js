require('dotenv').config()
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
// added 6/9
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');


const app = express();
const PORT = process.env.PORT || 3001; 

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  
}

// added code below from mini project solved:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});




// this app.use was here, is it needed?
// app.use(routes);


// this code added below is what is in mini project:
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};


// added, calls the async function to start the server:
startApolloServer();
