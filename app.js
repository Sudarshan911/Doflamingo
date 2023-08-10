const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const { utilityConstants } = require('./constants/constants');

const app = express();
const { logger } = require('./utils/logger');
// const cors = require('cors');
require('./utils/envConfig').setEnvironments();

// Check cors while interacting with frontend
// app.use(cors());
const setOrigin = '*';

// accept request from any origin : check whats recommended for prduction
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', setOrigin);
  // res.setHeader('Cache-Control', 9600); use when needed
  next();
});

// this header gives the server technology used. Removing it to enhance security
app.disable('x-powered-by');

// mongo request sanitize : only sanitising query, check for body.
app.use(
  mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      logger.warn(
        `Request: ${req.originalUrl} | This request[${key}] is sanitized`,
      );
    },
  }),
);

if (process.env.APP_ENV !== 'test') {
  require('./utils/mongoose.js').connectWithRetry();
}

// will parse request body if its in json format
app.use(bodyParser.json({ limit: '20mb' }));

// will parse request body if its in x-www-form-urlencoded format
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use('/auth', require('./routes/users'));

app.use((req, res) => {
  logger.error(`Not found : ${req.originalUrl}  `);
  res.status(utilityConstants.serviceResponseCodes.notFound.status).json({ message: utilityConstants.serviceResponseCodes.notFound.message });
});

// This middleware is used to catch all the errors related to middlewares used and the routes. It acts as a global catch for them. the 'next' argument passed here is required to catch the middleware and route related errors. The error hadling blocks should at the end so that they can act as global error handlers
app.use((err, req, res, next) => {
  logger.info(`error url :  ${req.originalUrl}`);
  logger.error(err.stack);
  return res.status(500).json({
    message: 'Something broke please try again after some time',
  });
});

// When any uncaught exception is thrown, eg. error thrown without try catch bloc will be catched here.
process.on('uncaughtException', (error) => {
  logger.error('Unhandled exception caught.');
  logger.error(error);
  process.exit(1);
})
  // Any unhandled promise rejection will be caught here. Eg , if we are receiving a rejected promise but not using .catch() to handle it. In our services, any uncaught promise rejection or exception will be caught in this block as async functions will return promise only.
  .on('unhandledRejection', (error) => {
    logger.error('unhandledRejection thrown');
    logger.error(error);
    process.exit(1);
  });

app.listen(process.env.PORT, (error) => {
  if (error) {
    logger.error(`Server creation error : ${error}`);
  }
  logger.info(`Server created successfully. Listening at port ${process.env.PORT} `);
});
