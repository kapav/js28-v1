import async from 'async'

import genre from '../models/genre.mjs'
import book from '../models/book.mjs'

// Показать список всех жанров.
export function genreList(req, res, next) {
    genre.find()
        .sort([['name', 'ascending']])
        .exec(function(err, genreList) {
            if (err) { return next(err) }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('genreList', { title: 'Список жанров', genreList })
        })
};

// Показать подробную страницу для заданного жанра.
export function genreDetail(req, res, next) {
    async.parallel({
        genre: function(callback) {
            genre.findById(req.params.id)
                .exec(callback)
        },
        genreBooks: function(callback) {
            book.find({ 'genre': req.params.id })
                .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.genre === null) { // Результаты отсутствуют.
            var err = new Error('Жанр не найден')
            err.status = 404
            return next(err)
        }
        // Успешное завершение, поэтому нужно отрисовать
        res.render('genreDetail', { title: 'Подробности жанра', genre: results.genre, genreBooks: results.genreBooks })
    })
};

// Показать форму создания жанра по запросу GET.
export function genreCreateGet(req, res) {
    res.send('Не реализовано: Добавление жанра по запросу GET');
};

// Создать жанр по запросу POST.
export function genreCreatePost(req, res) {
    res.send('Не реализовано: Добавление жанра по запросу POST');
};

// Показать форму удаления жанра по запросу GET.
export function genreDeleteGet(req, res) {
    res.send('Не реализовано: Удаление жанра по запросу GET');
};

// Удалить жанр по запросу POST.
export function genreDeletePost(req, res) {
    res.send('Не реализовано: Удаление жанра по запросу POST');
};

// Показать форму обновления жанра по запросу GET.
export function genreUpdateGet(req, res) {
    res.send('Не реализовано: Обновление жанра по запросу GET');
};

// Обновить жанр по запросу POST.
export function genreUpdatePost(req, res) {
    res.send('Не реализовано: Обновление жанра по запросу POST');
};
