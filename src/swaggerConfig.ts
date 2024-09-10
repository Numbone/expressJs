// swaggerConfig.js

import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0', // Specify the OpenAPI version
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple CRUD API application made with Express and documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3002', // The URL of your server
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/**/*.ts', './src/**/*.js'], // Adjust the path based on your project structure
};

// Initialize swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options);

