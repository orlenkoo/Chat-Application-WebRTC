const express = require('express');
const formidable = require('express-formidable');
const cors = require('cors');

const app = new express();

app.use(cors());
app.use(formidable());

app.use((req, res) => {
  console.log('hello world');

  res.status(200).json({message: 'ok', ...req.fields})
});

app.listen(80);
