var locale = window.locale || {};
locale.uk = {
    ".": ",",
    "File": "Файл",
    "Number of questions": "Кількість запитань",
    "Size": "Розмір",
    "Max file size": "Максимальний розмір файлу",
    "Encoding": "Кодування",
    "Error": "Помилка",
    "utf-8": "Найбільш поширене кодування, яке підтримує всі мови",
    "cp1251": "Кодування кирилиці, поширене в Windows",
    "koi8": "Кодування кирилиці, поширене в Linux",
    "Unsupported file type %s": "Тип файлів %s не підтримується"
};

function t(text, defaultValue) {
    return locale.uk[text] || defaultValue || text;
}

document.addEventListener("DOMContentLoaded", function() {
   var ts = document.getElementsByClassName('t');
    for (var i = 0; i < ts.length; i++) {
        var $t = ts[i];
        $t.innerHTML = t($t.innerHTML);
    }
});