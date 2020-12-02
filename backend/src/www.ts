import 'source-map-support/register';
import { config } from 'dotenv';
import express from 'express';

import App from './App';

config();

const port: number = Number(process.env.BACKEND_PORT) || 3000;
const app: express.Application = new App().app;

app
  .listen(port, () => console.log(`Express server listening at ${port}`))
  .on('error', (err) => console.error(err));
