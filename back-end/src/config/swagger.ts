import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

const envFound = dotenv.config();
const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Map Service - APIs',
      version: '1.0.0',
      description: 'API documentation for Map Service',
    },
    servers: [
      {
        url: `${APP_HOST}:${APP_PORT}/api/v1/`
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
