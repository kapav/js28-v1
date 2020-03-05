import bookinstance from '../models/bookinstance.mjs'

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
export function bookinstanceCreateGet(req, res) {
    res.send('Не реализовано: Добавление экземпляра книги по запросу GET');
};

// Создать экземпляр книги по запросу POST.
export function bookinstanceCreatePost(req, res) {
    res.send('Не реализовано: Добавление экземпляра книги по запросу POST');
};

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
