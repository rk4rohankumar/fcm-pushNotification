// generateData.js
const mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();
const Data = require('./models/Data');

const generateDummyData = async (numEntries) => {
  const data = [];
  for (let i = 0; i < numEntries; i++) {
    data.push({
      name: chance.first(),
      age: chance.age(),
      address: chance.city(),
    });
  }
  return data;
};

const insertData = async () => {
  try {
    await mongoose.connect('mongodb+srv://rwpmns:Rohan%40k1@cluster0.oxtmylt.mongodb.net/dataTable');
    const dummyData = await generateDummyData(1500);
    await Data.insertMany(dummyData);
    console.log('Dummy data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

insertData();
