// Adds support for Promise to socket.io-client
exports.promise = (socket) => {
  return function request(type, data = {}) {
    return new Promise((resolve) => {
      socket.emit(type, data, resolve);
    });
  };
};
