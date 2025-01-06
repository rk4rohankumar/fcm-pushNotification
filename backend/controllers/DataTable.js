const Data = require('../models/Data.js');
const User = require('../models/Data.js');

exports.getData = async (req, res) => {
    const { page = 1, pageSize = 10, search = '', sortField, sortOrder } = req.query;
  
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
  
    const sort = sortField
      ? { [sortField]: sortOrder === 'ascend' ? 1 : -1 }
      : {};
  
    try {
      const items = await Data.find(query)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));
  
      res.json({ items });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  };
  
  exports.getDataCount = async (req, res) => {
    const { search = '' } = req.query;
  
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
  
    try {
      const totalCount = await Data.countDocuments(query);
      res.json({ totalCount });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data count' });
    }
  };


  exports.addUser = async (req, res, next) => {
    try {
      console.log(req.body)
      const { name, age, address } = req.body;
      const newUser = new User({ name, age, address });
      console.log(newUser);
      await newUser.save()
      next();
    } catch (error) {
        res.status(500).json({ message: 'Error adding user',error });
    }
};