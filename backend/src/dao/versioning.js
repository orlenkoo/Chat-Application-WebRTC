const { Info, User } = require("../models");

const getCurrentVersion = async () => {
    return Info.findOne({}).sort("-build");
};

const updateCurrentVersion = ({version, build}) => {
    console.log(`Installing update: build ${build} version ${version}`.cyan);
    return Info({ version, build }).save();
};

const setDefaultTenant = async () => {
    return User.updateMany({ $or: [{ tenant: undefined }, { tenant: null }]}, { $set: { tenant: 'default' } });
};

module.exports = { getCurrentVersion, updateCurrentVersion, setDefaultTenant };
