import * as dotenv from 'dotenv';
import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';

dotenv.config();
const SWAGGER_SERVER = process.env.SWAGGER_SERVER as string;

const options: OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game Experience Tracker API Docs',
      version: process.env.npm_package_version as string,
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    servers: [
      {
        url: SWAGGER_SERVER,
        description: 'Development server',
      },
    ],
  },
  apis: ['**/*.yml'],
};

export const swaggerOptions = swaggerJSDoc(options);
