const Event = require('../../models/Event');

module.exports = async (req, res) => {
  const { id } = req.fields;

  let result;

  try {
    result = await Event.findByIdAndRemove(id);
  } catch (e) {
    return res.status(500).json({ status: 'error' });
  }

  res.status(200).json({ status: 'ok', result });
};
