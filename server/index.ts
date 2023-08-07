import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import authentication from './endpoints/authentication';

import logger from './middleware/logger';
import { config } from './config';

const app = express();
const PORT = config.app.port;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// middleware
app.use(cors());
app.use(logger);

// routes
app.use(authentication);

app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
});
