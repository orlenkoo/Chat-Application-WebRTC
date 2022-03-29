require("colors");
const connectDB = require("./src/dao/connectDB");
const Versioning = require("./src/dao/versioning");
const Users = require("./src/dao/users");
const Sessions = require("./src/dao/sessions");
const config = require("./config");
const Power = require("express-power");
const { log } = Power;
const isEmpty = require('./src/utils/isEmpty');
const webpush = require('web-push');

if (config.webPushContact && config.publicVapidKey && config.privateVapidKey) {
    webpush.setVapidDetails(config.webPushContact, config.publicVapidKey, config.privateVapidKey);
}

let scheduler;
let schedulerDone = false;

const master = async () => {
    console.log("");
    console.log("♥♥♥".green + " ♥♥♥".white + " ♥♥♥".red);
    console.log("♥♥♥".green + " ♥♥♥".white + " ♥♥♥".red);
    console.log("♥♥♥".green + " ♥♥♥".white + " ♥♥♥".red);
    console.log("");
    console.log("Honeyside".yellow);
    console.log(`Clover v${config.appVersion} (${config.appBuild})`.yellow);
    console.log("");

    const isConnected = await connectDB();

    if (!isConnected) return;

    const info = await Versioning.getCurrentVersion();

    if (!info || info.build < config.appBuild) {
        await Versioning.updateCurrentVersion({ version: config.appVersion, build: config.appBuild });
    }

    // Start Build 32 Update: add default tenant
    await Versioning.setDefaultTenant();
    // End Build 32 Update: add default tenant

    await Users.updateRootUser();
    await Sessions.deleteSessions();

    const getExternalIp = require('./src/utils/getExternalIp');
    config.ip = await getExternalIp();

    const { MediaRouter, MediaWorker, User } = require('./src/models');

    await User.updateMany({}, { $set: { status: 'offline', count: 0 } });
    await MediaRouter.deleteMany({ target: config.ip });
    await MediaWorker.deleteMany({ target: config.ip });

    const schedule = require('node-schedule');
    const { Email, Meeting, Producer } = require('./src/models');
    const sendMail = require('./src/utils/sendMail');

    // Cleanup on start

    const producers = await Producer.find({}).lean();

    for (let producer of producers) {
        if (!global.producers) {
            global.producers = [];
        }
        if (producer.producerID && !global.producers[producer.producerID]) {
            await Meeting.updateMany({}, { $pull: { producers: producer._id.toString() } });
            await Producer.deleteOne({ producerID: producer.producerID });
        }
    }

    // Cron jobs

    if (!scheduler) scheduler = schedule.scheduleJob('*/5 * * * * *', async () => {
        if (schedulerDone) {
            return;
        } else {
            schedulerDone = true;
        }

        // Mailer cron job

        const emails = await Email.find({ sent: false });

        for (let email of emails) {
            try {
                const html = `${email.html}${isEmpty(config.nodemailerFooter) ? '' : `<p>${config.nodemailerFooter}</p>`}`;
                await sendMail({
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    html,
                });
                const entry = await Email.findById(email._id);
                entry.sent = true;
                entry.dateSent = Date.now();
                await entry.save();
            } catch (e) {
                console.log(e);
            }
        }

        schedulerDone = false;
    });
}

const worker = async app => {
    const isConnected = await connectDB();
    if (!isConnected) return;

    const cors = require("cors");
    const formidable = require("express-formidable");
    const passport = require("passport");
    const jwtStrategy = require("./src/strategies/jwt");
    const routes = require("./src/routes");
    const xss = require("xss").filterXSS;
    const express = require("express");
    const http = require('http').createServer(app);

    require('./src/socket').init(http);

    app.use(cors());
    app.use(formidable({maxFileSize: Number.MAX_SAFE_INTEGER}));
    app.use((req, res, next) => {
        Object.keys(req.fields).map(key => typeof req.fields[key] === 'string' && (req.fields[key] = xss(req.fields[key])));
        next();
    })
    app.use(passport.initialize({}));
    passport.use('jwt', jwtStrategy);
    app.use('/api', routes);

    http.listen(config.port, () => log(`listening on port ${config.port}`.green))

    const getExternalIp = require('./src/utils/getExternalIp');
    config.ip = await getExternalIp();

    const media = require('./src/media');
    await media.init();

    log(`target ${config.ip}`.green);
    log(`spawned mediasoup worker pid ${global.worker.pid}`.green);
};

Power.load({ master, worker, logToFile: false, workers: 1 });


