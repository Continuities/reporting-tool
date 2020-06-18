/**
 * Data store for mutable values
 * @author mtownsend
 * @since June 2020
 */

import mongo from 'mongodb';

const getResources = db => db
  .collection('resources')
  .find()
  .toArray();

const saveConfig = async (db, config) => {
  let names = [];
  let emails = [];
  for (let i = 0; i < Object.keys(config).length / 2; i++) {
    const name = config[`name-${i}`];
    const email = config[`email-${i}`];
    if (name && email) {
      names.push(name);
      emails.push(email);
    }
  }

  const collection = db.collection('resources');

  // Remove anyone no longer represented
  await collection.deleteMany({ email: { $nin: emails }});
  // Upsert everything else
  await Promise.all(emails.map((email, i) => 
    collection.updateOne({ email: email }, { $set: {
      name: names[i],
      email: email
    }}, { upsert: true })
  ));
};

const setTired = async (db, email) => {
  const collection = db.collection('resources');
  await Promise.all([
    // Unexhaust everyone else
    await collection.updateMany({ email: { $ne: email }}, { $set: { tired: false }}),
    // Exhaust the selected resource
    await collection.updateOne({ email: email }, { $set: { tired: true }})
  ]);
};

export const getStore = async () => {
  const client = await mongo.MongoClient.connect('mongodb://mongo:27017');
  const db = client.db('app');
  return {
    getResources: getResources.bind(null, db),
    saveConfig: saveConfig.bind(null, db),
    setTired: setTired.bind(null, db)
  };
};
