const moment = require('moment');
const Power = require("express-power");
const { log } = Power;
const jwt = require('jsonwebtoken');
const { Meeting, Producer, Socket, User } = require('../models');
const config = require('../../config');
const secret = config.secret || "default secret";

let io;

module.exports = {
  init: (http) => {
    // start socket.io server and cache io value
    io = require('socket.io')(http, {
      cors: {
        origin: '*',
      }
    });

    log('socket.io active'.green);

    io.use((socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, secret, (err, decoded) => {
          if (err) return next(new Error('Authentication error'));
          socket.decoded = decoded;
          next();
        });
      }
      else {
        next(new Error('Authentication error'));
      }
    });

    io.on('connection', async (socket) => {
      const user = socket.decoded;

      socket.on('session', async (data, callback) => {
        let session;

        if (data.session) {
          session = await Socket.findById(data.session._id);
          session.socket = socket.id;
          session.status = 'active';
          await session.save();
          log(`socket connection recovered user ${user.username}`);
        }
        else {
          session = Socket({ user: user.id, socket: socket.id, status: 'active' });
          await session.save();
          log(`new socket connection user ${user.username}`);
        }

        socket.join(session._id);
        socket.join(user.id);

        callback({ success: true, status: 'success', session });
      });

      socket.on('disconnect', async () => {
        const session = await Socket.findOne({ socket: socket.id });
        console.log('disconnect', session);

        const producers = await Producer.find({ sessionId: session._id }).lean();
        await Producer.deleteMany({ sessionId: session._id });

        for (let producer of producers) {
          await Meeting.updateMany({}, { $pull: { producers: producer._id.toString() } });
        }

        await Socket.updateOne({ socket: socket.id }, { status: 'inactive', lastActive: Date.now() });

        const updateUser = await User.findById(user.id);
        updateUser.status = 'offline';
        updateUser.lastOnline = moment().toISOString();
        updateUser.count--;
        await updateUser.save();

        io.emit('offline', { id: user.id });

        log(`socket disconnected user ${user.username}`);
      });

      const updateUser = await User.findById(user.id);
      updateUser.status = 'online';
      updateUser.lastOnline = moment().toISOString();
      updateUser.count++;
      await updateUser.save();

      io.emit('online', { id: user.id });
    });

    return io;
  },
  get: () => {
    // return previously cached value
    if (!io) {
      throw new Error("must call .init(server) before you can call .getio()");
    }
    return io;
  }
}
