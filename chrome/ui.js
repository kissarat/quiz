function $id(id) {
    return document.getElementById(id);
}

function $$(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

function $name(name) {
    var $field = document.getElementsByName(name);
    if ($field.length > 1)
        throw '[name="' + name + '"] is not single';
    return $field[0];
}


function appropriate($element, attributes) {
    var keys = Object.keys($element);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        $element.setAttribute(key, attributes[key]);
    }
}

function fill_rows($container, rows) {
    $container.innerHTML = '';
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var $row = document.createElement('tr');
        for (var j = 0; j < row.length; j++) {
            var $cell = document.createElement('td');
            $cell.innerHTML = row[j];
            $row.appendChild($cell);
        }
        appropriate($row, row);
        $container.appendChild($row);
    }
}
