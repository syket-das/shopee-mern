const { S3 } = require('@aws-sdk/client-s3');
exports.s3Client = new S3({
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  region: 'nyc3',
  credentials: {
    accessKeyId: process.env.SPACE_KEY,
    secretAccessKey: process.env.SPACE_SECRET,
  },
});
