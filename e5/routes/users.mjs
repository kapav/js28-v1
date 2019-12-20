import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Маршрут для дополнительного сообщения */
router.get('/cool', function(req, res, next) {
  res.render('index', { title: 'Вид дополнительного сообщения' })
})

export default router;
