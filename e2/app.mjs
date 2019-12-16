//const express = require('express');
import express from 'express';
const app = express();

app.get('/', function(req, res) {
  res.send('Здравствуй, Вселенная!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
