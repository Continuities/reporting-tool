/**
 * Main server entry-point
 * @author mtownsend
 * @since June 2020
 */

import express from 'express';
import handlebars from 'express-handlebars';
import { getStore } from './store.js';
import { sendReport } from './mail.js';

const PORT = 8080;

(async () => {

  const app = express();
  const store = await getStore();

  // Set up template rendering
  app.engine('handlebars', handlebars());
  app.set('view engine', 'handlebars');

  // Set up body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static content
  app.use(express.static('static'));

  // Serve the reporting UI
  app.get('/', async (req, res) => {
    res.render('report', { 
      style: 'report.css',
      resources: await store.getResources()
    });
  });

  // Accept report submission
  app.post('/submit', async (req, res) => {
    sendReport(req.body);
    await store.setTired(req.body.resource);
    res.render('submit');
  });

  // Serve the config view.
  const configView = async (req, res) => 
    res.render('config', { 
      style: 'config.css',
      resources: await store.getResources()
    });
  app.get('/config', configView);
  app.post('/config', async (req, res, next) => {
    await store.saveConfig(req.body);
    next();
  }, configView);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

})();
