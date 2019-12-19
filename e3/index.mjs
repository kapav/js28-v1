import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Здравствуй, Вселенная! Пример №3')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
