// Загружаем HTTP модуль
//var http = require("http");
import http from 'http';

// Создаем HTTP-сервер и слушаем порт 8000 на запросы
http.createServer(function(request, response) {

   // Устанавливаем HTTP-заголовок ответа со статусом HTTP и Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Отсылаем тело ответа "Hello World"
   response.end('Hello world\n');
}).listen(8000);

// Выводим URL для доступа к серверу
console.log('Server running at http://127.0.0.1:8000/');
