const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const  htmlToText  = require('html-to-text');
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
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html)
}

exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones); // html body
  const text = htmlToText.fromString(html);// plain text body
  let opcionesEmail = { 
    from: '"PQRS👻" <noReaply@pqrs.com>', // sender address
    to: opciones.usuario.email, // list of receivers
    subject: opciones.subject, // Subject line
    text: text,
    html: html
};

//TODO la libreria Util para trasformarla a una funcion async transport.sendMail(mailOptions)
 const enviarEmail = util.promisify(transport.sendMail, transport);
 return enviarEmail.call(transport, opcionesEmail);

}


