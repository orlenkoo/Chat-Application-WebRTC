const { createModel } = require('mongoose-gridfs');
const { Log } = require("../models");
const info = require('../../info');

const saveFile = async (stream, options, md5, user, isThumbnail) => {
    return new Promise(async (resolve, reject) => {
        const File = createModel({ writeConcern: { w: 1 } });
        File.findOne({ md5 }, (err, file) => {
            if (err) reject(err);
            if (file) {
                Log({ key: 'duplicate', user, size: file.length, file, build: info.build, version: info.version, thumbnail: isThumbnail }).save();
                return resolve(file);
            }
            File.write(options, stream, (err, file) => {
                if (err) {
                    reject(err);
                }
                else {
                    Log({ key: 'write', user, size: file.length, file, build: info.build, version: info.version, thumbnail: isThumbnail }).save();
                    resolve(file);
                }
            });
        });
    });
};

module.exports = saveFile;
