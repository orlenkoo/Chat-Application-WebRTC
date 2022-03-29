require('dotenv').config();
const isEmpty = require('./src/utils/isEmpty');
const version = require('./version.json');

module.exports = {
  webPushContact: process.env.WEB_PUSH_CONTACT,
  publicVapidKey: process.env.PUBLIC_VAPID_KEY,
  privateVapidKey: process.env.PRIVATE_VAPID_KEY,
  appName: process.env.APP_NAME,
  appTitle: process.env.APP_TITLE,
  appVersion: version.version,
  appBuild: version.build,
  ip: process.env.MEDIASOUP_IP,
  verbose: process.env.MEDIASOUP_VERBOSE.toString() === 'true',
  workers: parseInt(process.env.POWER_WORKERS),
  port: 4011,
  registerEnabled: process.env.REACT_APP_REGISTER_ENABLED === 'true',
  nodemailer: {
    from: process.env.MAILER_FROM,
  },
  nodemailerTransport: {
    service: isEmpty(process.env.MAILER_SERVICE) ? undefined : process.env.MAILER_SERVICE,
    host: isEmpty(process.env.MAILER_HOST) ? undefined : process.env.MAILER_HOST,
    port: isEmpty(process.env.MAILER_PORT) ? undefined : parseInt(process.env.MAILER_HOST),
    secure: isEmpty(process.env.MAILER_SECURE) ? undefined : process.env.MAILER_SECURE === 'true',
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  nodemailerFooter: process.env.MAILER_FOOTER,
  rootUser: {
    username: process.env.ROOT_USER_USERNAME,
    email: process.env.ROOT_USER_EMAIL,
    password: process.env.ROOT_USER_PASSWORD,
    firstName: process.env.ROOT_USER_FIRST_NAME,
    lastName: process.env.ROOT_USER_LAST_NAME,
  },
  mongo: {
    uri: process.env.MONGO_URI,
    srv: process.env.MONGO_SRV.toString() === 'true',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    authenticationDatabase: process.env.MONGO_AUTHENTICATION_DATABASE,
    hostname: process.env.MONGO_HOSTNAME,
    port: process.env.MONGO_PORT,
  },
  secret: process.env.AUTH_SECRET,
  thumbnail: [{
    key: 'little',
    size: 128,
    type: 'crop', // Types are crop, width, height
  }, {
    key: 'medium',
    size: 256,
    type: 'crop', // Types are crop, width, height
  }, {
    key: 'big',
    size: 512,
    type: 'crop', // Types are crop, width, height
  }, {
    key: 'width',
    size: 512,
    type: 'width', // Types are crop, width, height
  }],
  mediaCodecs: [
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: 'video',
      mimeType: 'video/VP8',
      clockRate: 90000,
      parameters: {
        'x-google-start-bitrate': 1000,
      },
    },
  ]
};
