const mongoose = require('mongoose');
const { logger } = require('./logger');

let count = 0;
const connectWithRetry = (dbUrl = process.env.ATLAS_DNS) => {
  try {
    logger.info('Connecting... to MongoDB connection with retry');
    logger.info(dbUrl);
    return mongoose
      .connect(dbUrl)
      .then(() => {
        logger.info('MongoDB is connected');
      })
      .catch((err) => {
        logger.error(
          'MongoDB connection unsuccessful, retry after 5 seconds. ',
          ++count,
        );
        logger.error(err);
        logger.error('Retry MongoDB connection...');
        setTimeout(connectWithRetry, 5000);
      });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

module.exports = { connectWithRetry };
