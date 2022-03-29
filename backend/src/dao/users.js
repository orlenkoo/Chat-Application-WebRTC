const { User } = require("../models");
const config = require("../../config");
const argon2 = require('argon2');

const updateRootUser = async () => {
    const rootUser = config.rootUser || {};

    rootUser.username = (rootUser.username || "root").toLowerCase();

    const user = await User.findOne({ username: rootUser.username || "root" });

    const hash = await argon2.hash(rootUser.password || "root");

    if (!user) {
        await User.deleteMany({ roles: { $in: ["root"] } });

        return User({
            username: rootUser.username || "root",
            password: hash,
            firstName: rootUser.firstName || "Admin",
            lastName: rootUser.lastName || "User",
            email: rootUser.email || "admin@example.com",
            roles: ["root", "admin"],
        }).save();
    }
    else {
        return User.findOneAndUpdate({
            username: rootUser.username || "root",
        }, {
            $set: {
                password: hash,
                firstName: rootUser.firstName || "Admin",
                lastName: rootUser.lastName || "User",
                email: rootUser.email || "admin@example.com",
                roles: ["root", "admin"],
            },
        });
    }
};

const findUserByUsername = async (username) => {
    return User.findOne({ username });
};

const findUserByEmail = async (email) => {
    return User.findOne({ email });
};

const findUserById = async (id) => {
    return User.findById(id);
};

const insertUser = async (data) => {
    const hash = await argon2.hash(data.password);

    return User({
        username: data.username,
        password: hash,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roles: data.roles,
        location: data.location,
        tenant: data.tenant,
    }).save();
};

const findUsers = (query, sort, limit) => {
    return User.aggregate().project({
        _id: 0,
        id: '$_id',
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        roles: 1,
        address: 1,
        fullName: { $concat: ['$firstName', ' ', '$lastName'] },
        registrationDate: 1,
        lastLogin: 1,
        picture: 1,
        tenant: 1,
    }).match(query).sort(sort).limit(limit || 500).exec();
};

module.exports = { updateRootUser, findUserByUsername, insertUser, findUserById, findUsers, findUserByEmail };
