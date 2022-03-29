const { findUsers } = require("../../dao/users");

module.exports = async (req, res) => {
    const { limit, text, sortField, sortOrder } = req.fields;

    let query = {
        $and: [
            {
                username: { $ne: req.user.username },
            },
            {
                tenant: req.user.tenant,
            },
        ],
    };

    if (req.user.roles.includes('admin') || req.user.roles.includes('root')) {
        query = {
            $and: [
                {
                    username: { $ne: req.user.username },
                },
            ],
        };
    }

    if (text) {
        query.$and.push({
            $or: [
                { fullName: { $regex: `.*${text}.*`, $options: 'i' }},
                { username: { $regex: `.*${text}.*`, $options: 'i' }},
                { email: text },
            ],
        });
    }

    let sort = { _id: -1 };
    if (sortField) {
        sort = {};
        sort[sortField] = parseInt(sortOrder);
    }

    let users;

    try {
        users = await findUsers(query, sort, limit || 500);
        return res.status(200).json({ count: users.length, users });
    } catch (e) {
        return res.status(500).json({ status: "error", message: "database read error" });
    }
};
