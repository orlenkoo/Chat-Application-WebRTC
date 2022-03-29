const nodemailer = require('nodemailer');
const config = require('../../config');
const Power = require("express-power");
const { log } = Power;

const sendMail = (data) => {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport(config.nodemailerTransport);

    transport.verify((error) => {
      if (error) {
        log('error while connecting to smtp server'.red);
        reject(error);
      } else {
        transport.sendMail(data, (err) => {
          if (err) {
            log(`error while sending email to ${data.to} with subject ${data.subject}`.red);
            reject(err);
          } else {
            log(`email sent to ${data.to} with subject ${data.subject}`.green);
            resolve();
          }
        });
      }
    });
  });
};

module.exports = sendMail;
