const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
});

module.exports = mongoose.model('Data', DataSchema);