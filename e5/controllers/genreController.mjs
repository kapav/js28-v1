import genre from '../models/genre.mjs'

// Показать список всех жанров.
export function genreList(req, res) {
    res.send('Не реализовано: Список жанров');
};

// Показать подробную страницу для заданного жанра.
export function genreDetail(req, res) {
    res.send('Не реализовано: Страница подробностей для жанра: ' + req.params.id);
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
