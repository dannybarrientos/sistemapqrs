const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    }
  });
//TODO Generar HTML
const generarHTML = () => {
    const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`);
    return juice(html)
}
  let mailOptions = {
    from: '"PQRS👻" <noReaply@pqrs.com>', // sender address
    to: "correo@correo.com", // list of receivers
    subject: "Password reset", // Subject line
    text: "Hola", // plain text body
    html: generarHTML(), // html body
};