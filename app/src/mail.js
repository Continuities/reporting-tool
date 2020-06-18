/**
 * Handles construction and delivery of report emails
 * @author mtownsend
 * @since June 2020
 */

import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// TODO: Make these configurable
const FROM = '"Community Reporting" <report@localhost>';
const SUBJECT = 'Community Incident Report'

function loadTemplate(name) {
  const base = fileURLToPath(import.meta.url);
  const source = fs.readFileSync(path.join(base, '..', '..', 'views', `${name}.handlebars`), 'utf8');
  return Handlebars.compile(source, { noEscape: true });
}

const emailTemplate = loadTemplate('email');

const transporter = nodemailer.createTransport({
    host: 'smtp',
    port: 25,
    secure: false,
    tls: { rejectUnauthorized: false },
    debug: true,
});

export const sendReport = ({ comment, name, email, resource }) => {
  const body = emailTemplate({ comment, name, email });
  transporter.verify(error => {
    if (error) {
      return console.error(error);
    }

    const mail = {
      from: FROM,
      to: resource,
      subject: SUBJECT,
      text: body
    };

    transporter.sendMail(mail, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Report sent: %s', info.messageId);
    });
});
};
