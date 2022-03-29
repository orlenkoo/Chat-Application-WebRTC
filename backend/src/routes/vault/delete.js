const {createModel} = require('mongoose-gridfs');
const { findShieldGarbageIncluded, countDuplicateShields } = require("../../dao/shield");
const { Log, } = require("../../models");
const info = require('../../../info');

module.exports = async (req, res) => {
    const File = createModel();
    const { permanent } = req.fields;

    const shield = await findShieldGarbageIncluded(req.fields.shield);

    if (!shield) return res.status(404).json({ error: 'file not found' });

    if (shield.owner.toString() === req.user.id.toString()) {
        if (permanent) {
            let fileResult, shieldResult, thumbnailResults = [];

            const generateQuery = key => {
                const compare = key ? shield.thumbnail[key] : shield.file;
                let or = [{ file: compare }];
                for (let key of Object.keys(shield.thumbnail || {})) {
                    let obj = {};
                    obj[`thumbnail.${key}`] = compare;
                    or.push(obj);
                }
                return {$or: or};
            }

            try {
                for (let key of Object.keys(shield.thumbnail || {})) {
                    const files = await countDuplicateShields(generateQuery(key));
                    if (files === 1) {
                        await new Promise((resolve) => {
                            File.findOne({_id: shield.thumbnail[key]}, async (err, file) => {
                                try {
                                    Log({
                                        key: 'remove',
                                        size: file.length,
                                        file,
                                        user: req.user.id,
                                        build: info.build,
                                        version: info.version,
                                        thumbnail: true
                                    }).save();
                                    thumbnailResults.push(await File.unlink({_id: shield.thumbnail[key]}, (error) => console.log(error)));
                                } catch (e) {
                                    thumbnailResults.push(thumbnailResults[thumbnailResults.length - 1]);
                                }
                                resolve();
                            });
                        });
                    }
                }
                const files = await countDuplicateShields(generateQuery());
                if (files === 1) {
                    fileResult = await File.unlink({_id: shield.file}, (error) => console.log(error));
                    Log({ key: 'remove', size: shield.size, user: req.user.id, build: info.build, version: info.version }).save();
                }
            } catch (e) {
                console.log(e);
                return res.status(500).json({ status: "error", message: "error while deleting file" });
            }

            try {
                Log({ key: 'delete', shield, size: shield.size, user: req.user.id, build: info.build, version: info.version }).save();
                shieldResult = await shield.delete();
            } catch (e) {
                console.log(e);
                return res.status(500).json({ status: "error", message: "error while deleting shield" });
            }

            res.status(200).json({ file: fileResult, shield: shieldResult, thumbnailResults, status: "deleted" });
        }
        else {
            shield.garbage = true;

            try {
                Log({ key: 'garbage', shield, user: req.user.id, build: info.build, version: info.version }).save();
                await shield.save();
            } catch (e) {
                return res.status(500).json({ status: "error", message: "error while trashing file" });
            }

            res.status(200).json({ shield, status: "garbage" });
        }
    }
    else {
        res.status(401).json({ error: 'unauthorized user' });
    }
};
