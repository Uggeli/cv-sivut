const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const WeatherDataApi = require('./datasources/weatherDataApi');
const RecipeApi = require('./datasources/RecipeApi');
const ProductApi = require('./datasources/ProductApi');

const resolvers = require('./resolvers');
require('dotenv').config();

const myPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext) {
      console.log('Request started! Query:\n' +
        requestContext.request);
  
      return {
        // Fires whenever Apollo Server will parse a GraphQL
        // request to create its associated document AST.
        async parsingDidStart(requestContext) {
          console.log('Parsing started!');
        },
  
        // Fires whenever Apollo Server will validate a
        // request's document AST against your GraphQL schema.
        async validationDidStart(requestContext) {
          console.log('Validation started!');
        },
  
      }
    },
  };


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        // myPlugin
      ],
    context: ({reg}) => {
        // console.log(reg)
      
    },
    dataSources: () => ({
        weatherAPI: new WeatherDataApi(),
        RecipeApi: new RecipeApi(),
        ProductApi: new ProductApi(),
    })
});


server.listen().then(() => {
    console.log("running")
})