/**
 * Handles construction and delivery of report emails
 * @author mtownsend
 * @since June 2020
 */

import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

function loadTemplate(name) {
  const base = fileURLToPath(import.meta.url);
  const source = fs.readFileSync(path.join(base, '..', '..', 'views', `${name}.handlebars`), 'utf8');
  return Handlebars.compile(source, { noEscape: true });
}

const emailTemplate = loadTemplate('email');

export const sendReport = ({ comment, name, email, resource }) => {
  // TODO
  console.log(`sending to ${resource}:`, emailTemplate({ comment, name, email }));
};
