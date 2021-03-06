import async from 'async'

import book from '../models/book.mjs'
import author from '../models/author.mjs'
import genre from '../models/genre.mjs'
import bookinstance from '../models/bookinstance.mjs'

// Страница приветствия.
export function index(req, res) {
    async.parallel({
        bookCount: function(callback) {
            book.countDocuments({}, callback) // Нужно передать пустой объект как условие выборки для извлечения всех документов из данной коллекции
            // countDocuments не работает, работает только просто count
        },
        bookinstanceCount: function(callback) {
            bookinstance.countDocuments({}, callback)
        },
        bookinstanceAvailableCount: function(callback) {
            bookinstance.countDocuments({status: 'Доступен'}, callback)
        },
        authorCount: function(callback) {
            author.countDocuments({}, callback)
        },
        genreCount: function(callback) {
            genre.countDocuments({}, callback)
        }
    }, function(err, results) {
        res.render('index', { title: 'Домашняя страница местной библиотеки', error: err, data: results })
    })
};

// Показать список всех книг.
export function bookList(req, res, next) {
    book.find({}, 'title author')
        .populate({path: 'author'})
        .exec(function(err, bookList) {
            if (err) { return next(err) }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('bookList', { title: 'Список книг', bookList})
        })
};

// Показать подробную страницу для заданной книги.
export function bookDetail(req, res, next) {
    async.parallel({
        book: function(callback) {
            book.findById(req.params.id)
                .populate({path: 'author'})
                .populate({path: 'genre'})
                .exec(callback)
        },
        bookinstance: function(callback) {
            bookinstance.find({ 'book': req.params.id })
                .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.book === null) { // Результаты отсутствуют.
            const err = new Error('Книга не найдена')
            err.status = 404
            return next(err)
        }
        // Успешное завершение, поэтому нужно отрисовать
        res.render('bookDetail', { title: results.book.title, book: results.book, bookinstances: results.bookinstance })
    })
};

// Показать форму создания книги по запросу GET.
export function bookCreateGet(req, res) {
    res.send('Не реализовано: Добавление книги по запросу GET');
};

// Создать книгу по запросу POST.
export function bookCreatePost(req, res) {
    res.send('Не реализовано: Добавление книги по запросу POST');
};

// Показать форму удаления книги по запросу GET.
export function bookDeleteGet(req, res) {
    res.send('Не реализовано: Удаление книги по запросу GET');
};

// Удалить книгу по запросу POST.
export function bookDeletePost(req, res) {
    res.send('Не реализовано: Удаление книги по запросу POST');
};

// Показать форму обновления книги по запросу GET.
export function bookUpdateGet(req, res) {
    res.send('Не реализовано: Обновление книги по запросу GET');
};

// Обновить книгу по запросу POST.
export function bookUpdatePost(req, res) {
    res.send('Не реализовано: Обновление книги по запросу POST');
};
