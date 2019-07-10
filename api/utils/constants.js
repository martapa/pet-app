const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') dotenv.config();

exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
exports.AWS_S3_REGION = process.env.AWS_S3_REGION;
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.ENV_GOOGLE_KEY = process.env.ENV_GOOGLE_KEY;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.PORT = process.env.PORT;
exports.SECRET = process.env.SECRET;
