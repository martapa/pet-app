const { handleRequestBodyParsing } = require('./common');
const { handleHelmet } = require('./helmet');

module.exports = [handleHelmet, handleRequestBodyParsing];
