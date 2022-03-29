const express = require('express');

const app = new express();

app.use(express.static(__dirname + '/build'));
app.use('*', express.static(__dirname + '/build'));

app.listen(4012, () => {
  console.log('frontend listening');
});
