//const express = require('express');
import path from 'path';
import logger from 'morgan';
import favicon from 'serve-favicon';
import express from 'express';
const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(3);
const app = express();
const router = express.Router();

var mfAllVerbsRoutes = function(req, res, next) {
  console.log('Промежуточный уровень. Все маршруты и глаголы.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

var mfSpecificRoute = function(req, res, next) {
  console.log('Промежуточный уровень. Заданный маршрут.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

var mfSpecificVerbRoute = function(req, res, next) {
  console.log('Промежуточный уровень. Заданный HTTP-глагол и маршрут.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(logger('dev'));

// Функция добавлена с помощью use() для всех маршрутов и глаголов
app.use(mfAllVerbsRoutes);

// Функция добавлена с помощью use() для заданного маршрута
app.use('/someroute', mfSpecificRoute);

// Функция промежуточного уровня добавлена для заданного HTTP-глагола и маршрута
app.get('/', mfSpecificVerbRoute);

app.get('/', function(req, res) {
  res.send('Здравствуй, Вселенная!');
});

app.get('/someroute', function(req, res) {
  res.send('Страница заданного маршрута');
});

app.get('/about', function(req, res) {
  res.send('Описание данного сайта');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Произошла ошибка!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
