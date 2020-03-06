import async from 'async'
import validator from 'express-validator'

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
export function bookCreateGet(req, res, next) {
    // Запросить авторов, один из которых написал книгу, и жанры, к одному из которых относится книга, которая добавляется.
    async.parallel({
        authors: function(callback) {
            author.find(callback)
        },
        genres: function(callback) {
            genre.find(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        res.render('bookForm', { title: 'Добавить книгу', authors: results.author, genres: results.genres })
    })
};

// Создать книгу по запросу POST.
export const bookCreatePost = [
    // Преобразовать единичный жанр в массив из одного элемента.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = []
            else
                req.body.genre = new Array(req.body.genre)
        }
        next()
    },

    // Проверить контролы.
    validator.body('title', 'Название книги должно быть заполнено.').trim().isLength({ min: 1 }),
    validator.body('author', 'Автор должен быть указан.').trim().isLength({ min: 1 }),
    validator.body('summary', 'Краткое содержание должно быть приведено.').trim().isLength({ min: 1 }),

    // Очистить контролы с помощью символов подстановки.
    validator.body('*').escape(),

    // Выполнить запрос после проверки и очистки.
    (req, res, next) => {
        // Извлечь ошибки проверки из запроса.
        const errors = validationResult(req)

        // Добавить объект книги с заэкранированными данными, у которых также отсечены начальные и хвостовые пробелы.
        const currentBook = new book(
            {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: req.body.genre
            })

        if (!errors.isEmpty()) {
            // Ошибки существуют. Отрисовать форму повторно с очищенными значениями и сообщениями об ошибке.
            // Запросить авторов, один из которых написал книгу, и жанры, к одному из которых относится книга, для отображения формы.
            async.parallel({
                authors: function(callback) {
                    author.find(callback)
                },
                genres: function(callback) {
                    genre.find(callback)
                }
            }, function(err, results) {
                if (err) { return next(err) }
                // Выделить выбранные жанры как помеченные.
                for (let i = 0; i < results.genres.length; i++) {
                    if (currentBook.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = 'true'
                    }
                }
                console.log('bookCreatePost results:', results)
                res.render('bookForm', {
                    title: 'Добавить книгу',
                    authors: results.authors,
                    genres: results.genres,
                    book: currentBook,
                    errors: errors.array()
                })
            })
            return
        }
        else {
            // Данные из формы верны. Сохранить книгу.
            currentBook.save(function(err) {
                if (err) { return next(err) }
                // Книга сохранена - перенаправить на страницу с информацией о ней.
                res.redirect(book.url)
            })
        }
    }
];

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
