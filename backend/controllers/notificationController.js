const webPush = require('../utils/webPush');
const { getAdmin } = require('../secret/firbaseadmin');
const Token = require('../models/Token');
let subscriptions =  [] ;

const admin = getAdmin();
const subscribe = async(req, res) => {
  const {token} = req.body;
  subscriptions.push(token);
  const exists = await Token.find({ token });
  if(exists) return res.status(200).json({ message: 'Subscription already exists.' });
    await Token.create({ token });
  console.log("token received:",token);
  res.status(201).json({ message: 'Subscription added successfully.' });
};

const sendNotification = async (req, res) => {
  const { title, body,image } = req.body;
  const tokens = (await Token.find().select('token').lean()).map(({ token }) => token);
  console.log('tokens:', tokens,'subscriptions:',subscriptions);
  const message = {
    notification: {
      title,
      body,
      image,
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      ...message,
    });
    res.status(200).json({ message: 'Notifications sent successfully.', response });
  } catch (error) {
    res.status(500).json({ error: `Error sending message: ${error.message}` });
  }
};


module.exports = { subscribe, sendNotification };
