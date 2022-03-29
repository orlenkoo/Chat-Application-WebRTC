const User = require('../../models/User');
const webpush = require('web-push');

module.exports = async (req, res) => {
  const { subscription } = req.fields

  console.log('subscription', subscription)
  console.log('subscription id', req.user.id)

  try {
    await User.findByIdAndUpdate(req.user.id, {$set: {subscription}});
  } catch (e) {
    console.log(e);
  }

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'Push notifications are now active.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
};
