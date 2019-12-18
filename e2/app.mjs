import path from 'path';
import logger from 'morgan';
import favicon from 'serve-favicon';
import express from 'express';
import connect from 'mongodb';

const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(3);
const app = express();
const mongoClient = connect.MongoClient;

const mfAllVerbsRoutes = function(req, res, next) {
  console.log('Промежуточный уровень. Все маршруты и глаголы.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

const mfSpecificRoute = function(req, res, next) {
  console.log('Промежуточный уровень. Заданный маршрут.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

const mfSpecificVerbRoute = function(req, res, next) {
  console.log('Промежуточный уровень. Заданный HTTP-глагол и маршрут.');
  next(); // Вызывает next() чтобы Express вызвал следующую функцию промежуточного уровня в конвейере.
}

mongoClient.connect('mongodb://localhost:27017', {
  useUnifiedTopology: true
}, function(err, client) {
  if (err) { throw err; }
  const db = client.db('animals');
  db.collection('mammals').find().toArray(function(err, result) {
    if (err) { throw err; }
    console.log(result);
  })
});

// Задаёт папку для шаблонов, './views' по умолчанию
app.set('views', path.join(__dirname, 'views'));
// Задаёт шаблонизатор
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(logger('dev'));
app.use('/css', express.static('public'));

// Функция добавлена с помощью use() для всех маршрутов и глаголов
app.use(mfAllVerbsRoutes);

// Функция добавлена с помощью use() для заданного маршрута
app.use('/someroute', mfSpecificRoute);

// Функция промежуточного уровня добавлена для заданного HTTP-глагола и маршрута
app.get('/', mfSpecificVerbRoute);

app.get('/', function(req, res) {
  res.render('index', { title: 'js28-v1-e2', message: 'Здравствуй, Вселенная!' });
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
