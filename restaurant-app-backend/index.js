const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client"); // Import Prisma Client

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the GraphQL schema
const typeDefs = `#graphql
  type Restaurant {
    id: Int
    name: String
    address: String
    latitude: Float
    longitude: Float
    openingHours: String
    rating: Float
  }

  type Query {
    nearbyRestaurants(latitude: Float!, longitude: Float!, radius: Float!, rating: Float!): [Restaurant]
  }
`;

// Define resolvers for the schema
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const resolvers = {
  Query: {
    nearbyRestaurants: async (_, { latitude, longitude, radius, rating }) => {
      // Fetch all restaurants from the database
      const allRestaurants = await prisma.restaurant.findMany();

      // Filter restaurants based on distance
      const nearbyRestaurants = allRestaurants.filter((restaurant) => {
        const distance = haversineDistance(
          latitude,
          longitude,
          restaurant.latitude,
          restaurant.longitude
        );
        return distance <= radius; // Only include restaurants within the specified radius
      });

      // return allRestaurants; // Return the filtered list of nearby restaurants
      return nearbyRestaurants?.filter((e) => e?.rating >= rating); // Return the filtered list of nearby restaurants
    },
  },
};

// Initialize Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start Apollo Server
(async () => {
  await server.start();

  // Apply middleware to Express app
  app.use(
    cors(), // Enable CORS
    bodyParser.json(), // Parse JSON bodies
    expressMiddleware(server) // Connect Apollo Server
  );

  // Start the HTTP server
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
})();
