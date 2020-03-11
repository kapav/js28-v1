import validator from 'express-validator'

import bookinstance from '../models/bookinstance.mjs'
import book from '../models/book.mjs'

// Показать список всех экземпляров книг.
export function bookinstanceList(req, res, next) {
    bookinstance.find()
        .populate({path: 'book'})
        .exec(function(err, bookinstanceList) {
            if (err) { return next(err) }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('bookinstanceList', { title: 'Список экземпляров книг', bookinstanceList })
        })
};

// Показать подробную страницу для заданного экземпляра книги.
export function bookinstanceDetail(req, res) {
    bookinstance.findById(req.params.id)
        .populate({path: 'book'})
        .exec(function(err, bookinstance) {
            if (err) { return next(err) }
            if (bookinstance === null) { // Результаты отсутствуют.
                const err = new Error('Экземпляр книги не найден')
                err.status = 404
                return next(err)
            }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('bookinstanceDetail', { title: 'Экземпляр книги: ' + bookinstance.book.title, bookinstance })
        })
};

// Показать форму создания экземпляра книги по запросу GET.
export function bookinstanceCreateGet(req, res, next) {
    book.find({}, 'title')
        .exec(function(err, books) {
            if (err) { return next(err) }
            // Успешное завершение, поэтому нужно отрисовать
            res.render('bookinstanceForm', {title: 'Добавить экземпляр книги', bookList: books})
        })
};

// Создать экземпляр книги по запросу POST.
export const bookinstanceCreatePost = [
    // Проверить контролы.
    validator.body('book', 'Книга должна быть указана.').trim().isLength({ min: 1 }),
    validator.body('imprint', 'Выходные данные должны быть заполнены.').trim().isLength({ min: 1 }),
    validator.body('dueBack', 'Неправильная дата.').optional({ checkFalsy: true }).isISO8601(),

    // Очистить контролы.
    validator.body('book').escape(),
    validator.body('imprint').escape(),
    validator.body('status').trim().escape(),
    validator.body('dueBack').toDate(),

    // Выполнить запрос после проверки и очистки.
    (req, res, next) => {
        // Извлечь ошибки проверки из запроса.
        const errors = validator.validationResult(req)

        // Добавить объект экземпляра книги для книги с заэкранированными данными, у которых также отсечены начальные и хвостовые пробелы.
        const currentBookinstance = new bookinstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                dueBack: req.body.dueback
            })

        if (!errors.isEmpty()) {
            // Ошибки существуют. Отрисовать форму повторно с очищенными значениями и сообщениями об ошибке.
            book.find({}, 'title')
                .exec(function(err, books) {
                    if (err) { return next(err) }
                    // Успешное завершение, поэтому нужно отрисовать
                    res.render('bookinstanceForm', {
                        title: 'Добавить экземпляр книги', bookList: books,
                        selectedBook: currentBookinstance.book._id,
                        errors: errors.array(),
                        bookinstance: currentBookinstance
                    })
                })
            return
        }
        else {
            // Данные из формы верны.
            currentBookinstance.save(function(err) {
                if (err) { return next(err) }
                // Экземпляр книги сохранён - перенаправить на страницу с информацией о нём.
                res.redirect(currentBookinstance.url)
            })
        }
    }
];

// Показать форму удаления экземпляра книги по запросу GET.
export function bookinstanceDeleteGet(req, res) {
    res.send('Не реализовано: Удаление экземпляра книги по запросу GET');
};

// Удалить экземпляр книги по запросу POST.
export function bookinstanceDeletePost(req, res) {
    res.send('Не реализовано: Удаление экземпляра книги по запросу POST');
};

// Показать форму обновления экземпляра книги по запросу GET.
export function bookinstanceUpdateGet(req, res) {
    res.send('Не реализовано: Обновление экземпляра книги по запросу GET');
};

// Обновить экземпляр книги по запросу POST.
export function bookinstanceUpdatePost(req, res) {
    res.send('Не реализовано: Обновление экземпляра книги по запросу POST');
};
