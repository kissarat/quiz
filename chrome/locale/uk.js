var locale = window.locale || {};
locale.uk = {
    ".": ",",
    "Encoding": "Кодування",
    "File": "Файл",
    "Number of questions": "Кількість запитань",
    "Size": "Розмір",
    "utf-8": "Найбільш поширене кодування, яке підтримує всі мови",
    "cp1251": "Кодування кирилиці, поширене в Windows",
    "koi8": "Кодування кирилиці, поширене в Linux"
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