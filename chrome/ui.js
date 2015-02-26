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

var $busy = $id('busy');

function busy(value) {
    if (value)
        $busy.classList.add('busy');
    else
        $busy.classList.remove('busy');
}

String.prototype.format = function() {
    var result = this;
    for (var i = 0; i < arguments.length; i++)
        result = result.replace('%', arguments[i]);
    return result;
};

function appropriate($element, attributes) {
    for (var key in attributes) {
        if (isNaN(key) && 'length' != key)
            $element.setAttribute(key, attributes[key]);
    }
}

function array(iterable) {
    return Array.prototype.slice.call(iterable);
}

function add_rows($container, rows) {
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var $row = document.createElement('tr');
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var $cell = document.createElement('td');
            switch (typeof cell) {
                case 'boolean':
                    var $input = document.createElement('input');
                    $input.type = 'checkbox';
                    $input.checked = cell;
                    $cell.appendChild($input);
                    break;
                case 'function':
                    $cell.onclick = cell;
                    break;
                default:
                    $cell.innerHTML = cell;
            }
            appropriate($cell, cell);
            $row.appendChild($cell);
        }
        appropriate($row, row);
        $container.appendChild($row);
    }
}

var metrics = {
    1: 'K',
    2: 'M'
};

function metric(n, base) {
    if (!base)
        base = 1024;
    var exp = Math.log(n) / Math.log(base);
    exp = Math.floor(exp);
    if (exp > 0) {
        n = n / Math.pow(2, exp * 10);
        n = n.toPrecision(3) + metrics[exp];
        return n;
        //n = n.split('.');
        //return n.join(t('.'));
    }
    return n;
}

function l() {
    console.log.apply(this, arguments);
}

function trace_event(e) {
    console.log(e.type, e.target);
}

function fire(event, $target) {
    event = new CustomEvent(event);
    $target.dispatchEvent(event);
}

function change($target, value) {
    $target.value = value;
    fire('change', $target);
}

function property(name) {
    return function(object) {
        return object[name];
    }
}

var encodings = ['utf-8', 'cp1251', 'koi8'];

document.addEventListener('DOMContentLoaded', function() {
    var i;
    if (window.TextDecoder) {
        var $encoding = $id('encoding');
        $encoding.style.removeProperty('display');
        $encoding.innerHTML = '';
        for (i = 0; i < encodings.length; i++) {
            var encoding = encodings[i];
            var $option = document.createElement('option');
            $option.value = encoding;
            $option.innerHTML = encoding;
            $encoding.appendChild($option);
        }
        $encoding.onchange = function() {
            $id('encoding_info').value = t(this.value);
        };
        change($encoding, 'utf-8');
    }
    else
        console.error('TextDecoder not found');
});

addEventListener('load', trace_event);
