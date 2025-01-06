const webPush = require('../utils/webPush');
const { getAdmin } = require('../secret/firbaseadmin');

let subscriptions =  [] ;

const admin = getAdmin();
const subscribe = (req, res) => {
  const {token} = req.body;
  subscriptions.push(token);
  console.log("token received:",token);
  res.status(201).json({ message: 'Subscription added successfully.' });
};

const sendNotification = async (req, res) => {
  const { title, body,image } = req.body;
  const tokens = subscriptions.map((sub) => sub);
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
