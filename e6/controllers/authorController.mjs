import async from 'async'
import validator from 'express-validator'

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
    res.render('authorForm', { title: 'Добавить автора' })
};

// Создать автора по запросу POST.
export const authorCreatePost = [
    // Проверить контролы.
    validator.body('firstName').isLength({ min: 1 }).trim()
        .withMessage('Поле имени должно быть зааполнено.')
        .isAlphanumeric('ru-RU')
        .withMessage('Имя должно содержать только алфавитно-цифровые символы.'),
    validator.body('familyName').isLength({ min: 1 }).trim()
        .withMessage('Поле фамилии должно быть заполнено.')
        .isAlphanumeric('ru-RU').withMessage('Фамилия должна содержать только алфавитно-цифровые символы.'),
    validator.body('dateOfBirth', 'Неправильная дата рождения')
        .optional({ checkFalsy: true }).isISO8601(),
    validator.body('dateOfDeath', 'Неправильная дата смерти')
        .optional({ checkFalsy: true }).isISO8601(),
    
    // Очистить контролы.
    validator.body('firstName').escape(),
    validator.body('familyName').escape(),
    validator.body('dateOfBirth').toDate(),
    validator.body('dateOfDeath').toDate(),

    // Выполнить запрос после проверки и очистки.
    (req, res, next) => {
        // Извлечь ошибки проверки из запроса.
        const errors = validator.validationResult(req)

        if (!errors.isEmpty()) {
            // Ошибки существуют. Отрисовать форму повторно с очищенными значениями и сообщениями об ошибке.
            res.render('authorForm', { title: 'Добавить автора', author: req.body, errors: errors.array() })
            return
        }
        else {
            // Данные из формы правильные.
            // Добавить объект автора с заэкранированными данными, у которых также отсечены начальные и хвостовые пробелы.
            const currentAuthor = new author(
                {
                    firstName: req.body.firstName,
                    familyName: req.body.familyName,
                    dateOfBirth: req.body.dateOfBirth,
                    dateOfDeath: req.body.dateOfDeath
                })
            currentAuthor.save(function(err) {
                if (err) { return next(err) }
                // Автор сохранён - перенаправить на страницу с информацией о нём.
                res.redirect(currentAuthor.url)
            })
        }
    }
];

// Показать форму удаления автора по запросу GET.
export function authorDeleteGet(req, res, next) {
    async.parallel({
        author: function(callback) {
            author.findById(req.params.id).exec(callback)
        },
        authorBooks: function(callback) {
            book.find({ 'author': req.params.id }).exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.author === null) { // Результаты отсутствуют.
            res.redirect('/catalog/authors')
        }
        // Успешное завершение, поэтому нужно отрисовать
        res.render('authorDelete', { title: 'Удаление автора', author: results.author, authorBooks: results.authorBooks })
    })
};

// Удалить автора по запросу POST.
export function authorDeletePost(req, res, next) {
    async.parallel({
        author: function(callback) {
            author.findById(req.body.authorid).exec(callback)
        },
        authorBooks: function(callback) {
            book.find({ 'author': req.body.authorid }).exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        // Успешное завершение
        if (results.authorBooks.length > 0) {
            // В библиотеке одна или более книг автора. Визуализации выполняется так же, как и по запросу GET.
            res.render('authorDelete', { title: 'Удаление автора', author: results.author, authorBooks: results.authorBooks })
            return
        }
        else {
            // У автора нет никаких книг. Удалить объект автора и перенаправить в список авторов.
            author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err) }
                // Успешное завершение. Перейти к списку авторов.
                res.redirect('/catalog/authors')
            })
        }
    })
};

// Показать форму обновления автора по запросу GET.
export function authorUpdateGet(req, res) {
    res.send('Не реализовано: Обновление автора по запросу GET');
};

// Обновить автора по запросу POST.
export function authorUpdatePost(req, res) {
    res.send('Не реализовано: Обновление автора по запросу POST');
};
