import app from "./app";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('no .env file found');
}

const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(APP_PORT, () => {
  console.log(`Server is running on ${APP_HOST}:${APP_PORT}`);
  console.log(`Swagger docs available at ${APP_HOST}:${APP_PORT}/api-docs`);
});
