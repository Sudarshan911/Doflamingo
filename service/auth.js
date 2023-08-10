const { utilityConstants } = require('../constants/constants');
const { logger } = require('../utils/logger');

exports.login = async (req, res) => {
  try {
    logger.info('auth@login');
    return res.status(utilityConstants.serviceResponseCodes.success).json({ message: 'login successful' });
  } catch (error) {
    logger.error(error);
    res.status(utilityConstants.serviceResponseCodes.serverError.status).json({ message: utilityConstants.serviceResponseCodes.serverError.message });
  }
};
