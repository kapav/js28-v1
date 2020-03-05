import async from 'async'

import author from '../models/author.mjs'
import book from '../models/book.mjs'

// Показать список всех авторов.
export function authorList(req, res, next) {
    author.find()
        .sort([['familyName', 'ascending']])
        .exec(function(err, authorList) {
            if (err) { return next(err) }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('authorList', { title: 'Список авторов', authorList })
        })
};

// Показать подробную страницу для заданного автора.
export function authorDetail(req, res, next) {
    async.parallel({
        author: function(callback) {
            author.findById(req.params.id)
                .exec(callback)
        },
        authorBooks: function(callback) {
            book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) } // Ошибка использования API
        if (results.author === null) { // Результаты отсутствуют.
            const err = new Error('Автор не найден')
            err.status = 404
            return next(err)
        }
        // Успешное завершение, поэтому нужно отрисовать
        res.render('authorDetail', { title: 'Информация об авторе', author: results.author, authorBooks: results.authorBooks })
    })
};

// Показать форму создания автора по запросу GET.
export function authorCreateGet(req, res) {
    res.send('Не реализовано: Добавление автора по запросу GET');
};

// Создать автора по запросу POST.
export function authorCreatePost(req, res) {
    res.send('Не реализовано: Добавление автора по запросу POST');
};

// Показать форму удаления автора по запросу GET.
export function authorDeleteGet(req, res) {
    res.send('Не реализовано: Удаление автора по запросу GET');
};

// Удалить автора по запросу POST.
export function authorDeletePost(req, res) {
    res.send('Не реализовано: Удаление автора по запросу POST');
};

// Показать форму обновления автора по запросу GET.
export function authorUpdateGet(req, res) {
    res.send('Не реализовано: Обновление автора по запросу GET');
};

// Обновить автора по запросу POST.
export function authorUpdatePost(req, res) {
    res.send('Не реализовано: Обновление автора по запросу POST');
};
