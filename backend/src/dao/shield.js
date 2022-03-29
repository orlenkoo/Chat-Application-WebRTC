const { Log, Shield } = require("../models");
const info = require('../../info');

const saveShield = async (data) => {
    const shield = await Shield(data).save();
    Log({ key: 'upload', shield, size: shield.size, user: data.owner, build: info.build, version: info.version }).save();
    return shield;
};

const findShield = (shield) => {
    return Shield.findOne({ shield, garbage: false })
};

const findShieldGarbageIncluded = (shield) => {
    return Shield.findOne({ shield })
};

const findShields = (query, sort, limit) => {
    return Shield.aggregate().match(query).project({
        _id: 0,
        id: '$_id',
        auth: 1,
        tags: 1,
        views: 1,
        name: 1,
        originalName: 1,
        description: 1,
        extension: 1,
        path: 1,
        type: 1,
        size: 1,
        visibility: 1,
        duration: 1,
        width: 1,
        height: 1,
        shield: 1,
        timestamp: 1,
        garbage: 1,
    }).sort(sort).limit(limit || 500).exec();
};

const findShieldsWithOwner = (query, sort, limit) => {
    return Shield.aggregate().match(query).lookup({
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
    }).project({
        _id: 1,
        auth: 1,
        owner: {
            firstName: 1,
            lastName: 1,
        },
        tags: 1,
        views: 1,
        name: 1,
        originalName: 1,
        description: 1,
        extension: 1,
        path: 1,
        type: 1,
        size: 1,
        visibility: 1,
        duration: 1,
        width: 1,
        height: 1,
        shield: 1,
        timestamp: 1,
        garbage: 1,
    }).sort(sort).limit(limit || 500).exec();
};

const countShields = (query) => {
    return Shield.aggregate([{ $match: query }, { $count: "count" }]).exec();
};

const countDuplicateShields = (query) => {
    return Shield.countDocuments(query);
};

module.exports = { saveShield, findShield, findShieldGarbageIncluded, findShields, countShields, countDuplicateShields, findShieldsWithOwner };
