import express from 'express'

const router = express.Router()

/* Маршрут примера 5.2. «Основы шаблонов» */
router.get('/templatePrimer', function(req, res, next) {
  res.render('index', { title: 'Вид сообщения для основ шаблонов' })
})

export default router;
