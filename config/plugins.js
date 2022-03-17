//Configuraciond de Strapi con AWS (SErvicio S3)

module.exports = ({ env }) => ({
    upload: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: 'us-east-1',
        params: {
          Bucket: 'game--ecommerce',
        },
      },
    },
  });