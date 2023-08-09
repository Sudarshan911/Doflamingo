const path = require('path');
const { logger } = require('./logger');

exports.setEnvironments = () => {
  try {
    const environment = process.env.APP_ENV ? process.env.APP_ENV : 'dev';
    const envPath = path.resolve(__dirname, '../environments', `.env-${environment}`);
    require('dotenv').config({ path: envPath });
    logger.info(envPath);
  } catch (error) {
    throw new Error(error);
  }
};
