import 'source-map-support/register';
import { config } from 'dotenv';

import App from './App';

config();

const port: number = Number(process.env.BACKEND_PORT) || 3000;
App.bootstrap(port);
