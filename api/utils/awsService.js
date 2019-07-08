const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const uuidv1 = require('uuid/v1');

const { HTTP400Error } = require('./httpErrors');

require('dotenv').config();

AWS.config.update({ region: process.env.AWS_S3_REGION });

const s3 = new AWS.S3();

exports.resizeAndUpload = async (file, folder) => {

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: '',
    Body: '',
    ContentType: 'image/jpeg'
  };
  const id = uuidv1();
  uploadParams.Key = `${folder}/${id}.jpeg`;

  try {
    const buffer = await sharp(file)
      .resize({ width: 400, height: 400 })
      .toBuffer();

    uploadParams.Body = buffer;

    if (uploadParams.Body !== '') {
      return new Promise((resolve, reject) => {
        s3.upload(uploadParams, function(err, data) {
          if (data) {
            resolve(data.Location);
          } else {
            // throw new HTTP400Error();
            reject(new HTTP400Error());
          }
        });
      });
    }
  } catch (err) {
    throw err;
  }
};
