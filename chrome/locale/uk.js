var locale = window.locale || {};
locale.uk = {
    "File": "Файл",
    "Number of questions": "Кількість запитань",
    "Size": "Розмір"
};

document.addEventListener("DOMContentLoaded", function() {
   var ts = document.getElementsByClassName('t');
    for (var i = 0; i < ts.length; i++) {
        var $t = ts[i];
        $t.innerHTML = locale.uk[$t.innerHTML] || $t.innerHTML;
    }
});