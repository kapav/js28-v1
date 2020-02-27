import book from '../models/book.mjs'

// Страница приветствия.
export function index(req, res) {
    res.send('Не реализовано: Домашняя страница сайта');
};

// Показать список всех книг.
export function bookList(req, res) {
    res.send('Не реализовано: Список книг');
};

// Показать подробную страницу для заданной книги.
export function bookDetail(req, res) {
    res.send('Не реализовано: Страница подробностей для книги: ' + req.params.id);
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
