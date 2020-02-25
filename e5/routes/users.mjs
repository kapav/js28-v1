import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Маршрут для дополнительного сообщения */
router.get('/cool', function(req, res, next) {
  res.render('index', { title: 'Страница с примером дополнительного сообщения' })
})

/* Маршрут примера 5.2. «Основы шаблонов» */
router.get('/templatePrimer', function(req, res, next) {
  res.render('templatePrimer', { title: 'Страница с примерами для основ шаблонов' })
})

export default router;
