// controllers/tokenController.js
exports.saveToken = (req, res) => {
    const { token } = req.body;
    // Save the token to your database, associated with the user or device
    // Example: await TokenModel.create({ token });
    res.status(200).send('Token saved successfully');
  };
  