const mongoose = require('mongoose');
const config = require("../../config");
const { Log, Shield, User } = require('../models');
const moment = require('moment');
const {mongo} = config;

const getOverall = () => {
  const conn = mongoose.connection;
  return conn.db.stats();
};

const getReplica = async () => {
  const uri = mongo.uri || `mongodb${mongo.srv ? "+srv" : ""}://${mongo.username}:${encodeURIComponent(mongo.password)}@${mongo.hostname}:${mongo.port}/admin?authSource=admin`;

  let conn, result;
  try {
    conn = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        ssl: false,
    });
    result = await conn.db.command({"replSetGetStatus":1 });
    conn.close();
  } catch (e) {
    console.log(e);
    result = null;
  }
  return result;
};

const aggregateType = async (type) => {
  const aggregate = await Shield.aggregate([{
    $match: { type: { $regex: `.*${type}.*`, $options: 'i'  } },
  }, {
    $project: { _id: 1, type: 'type' },
  }, {
    $group : { _id: "$type", count: { $sum: 1 }},
  }]);

  return aggregate && aggregate[0] ? aggregate[0].count : 0;
}

const getCounts = async () => {
  let counts = {};

  counts.shields = await Shield.countDocuments();
  counts.images = await aggregateType('image');
  counts.videos = await aggregateType('video');
  counts.pdf = await aggregateType('pdf');
  counts.others = counts.shields - counts.images - counts.videos - counts.pdf;
  counts.users = await User.countDocuments();

  return counts;
};

const countKeyTraffic = async (key, date) => {
  let aggregate = await Log.aggregate([{
    $match: {
      key,
      timestamp: {
        $lte: date.endOf('day').toDate(),
        $gt: date.startOf('day').toDate(),
      },
    },
  }, {
    $project: { _id: 1, type: 'type', size: 1 },
  }, {
    $group : { _id: "$type", count: { $sum: '$size' }},
  }]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const getTraffic = async (days) => {
  let traffic = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = moment().subtract(i, 'days');
    const download = await countKeyTraffic('read', date);
    const upload = await countKeyTraffic('upload', date);
    const write = await countKeyTraffic('write', date);
    const remove = await countKeyTraffic('remove', date);
    traffic.push({ date: date.toISOString(), download, upload, write, remove });
  }

  return traffic;
};

const aggregateCurrentMonth = async (key) => {
  let aggregate = await Log.aggregate([{
    $match: {
      key,
      timestamp: {
        $gt: moment().startOf('month').toDate(),
      },
    },
  }, {
    $project: { _id: 1, type: 'type', size: 1 },
  }, {
    $group : { _id: "$type", count: { $sum: '$size' }},
  }]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const aggregateWeek = async (key) => {
  let aggregate = await Log.aggregate([{
    $match: {
      key,
      timestamp: {
        $gt: moment().subtract(7, 'days').toDate(),
      },
    },
  }, {
    $project: { _id: 1, type: 'type', size: 1 },
  }, {
    $group : { _id: "$type", count: { $sum: '$size' }},
  }]);
  return aggregate && aggregate[0] ? aggregate[0].count : 0;
};

const getTransfer = async () => {
  let transfer = {};

  transfer.download = await aggregateCurrentMonth('read');
  transfer.upload = await aggregateCurrentMonth('upload');

  return transfer;
};

const dataSizeVariation = async () => {
  let dataSizeVariation = {};

  const writesMonth = await aggregateCurrentMonth('write');
  const removesMonth = await aggregateCurrentMonth('remove');
  dataSizeVariation.month = writesMonth - removesMonth;

  const writesWeek = await aggregateWeek('write');
  const removesWeek = await aggregateWeek('remove');
  dataSizeVariation.week = writesWeek - removesWeek;

  return dataSizeVariation;
}

module.exports = { getOverall, getReplica, getCounts, getTraffic, getTransfer, dataSizeVariation };
