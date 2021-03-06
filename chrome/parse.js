function parse(content) {
    if ('string' == typeof content)
        content = content.split('\n');
    var result = [];
    var current = [];
    var answer;
    function save() {
        if (current) {
            if (answer)
                current.push(answer);
            //if (result.length < 1 || result[result.length - 1][0] != current[0])
            result.push(current);
        answer = null;
        current = [];
        }
    }
    // moodle gift format
    var gift = false;
    for(var i=0; i<content.length; i++) {
        var line = content[i];
        var comment = line.indexOf('//');
        if (comment >= 0)
            line = line.slice(0, comment);
        line = line.trim();
        if (!line)
            continue;
        line = line.replace(/\s+[\.,]/, function(s) {
            return s[s.length - 1];
        });

        var q;
        // ::  Де знаходиться верхівковий поштовх у здорової ди::  Де знаходиться верхівковий поштовх у здорової дитини 7,5  місяців?{
        if (0 == line.indexOf('::')) {
            line = line.replace(/::.*::/, '');
            line = line.replace(/\\./, function(s) {
                return s[1];
            });
            var html_start = line.indexOf('[html]');
            if (html_start >= 0) {
                var html = line.slice(html_start);
                html = html.replace('[html]', '');
                html = html.replace(/<[^>]+>/g, '');
                line = line.slice(0, html_start) + html;
            }
            //line = line.replace('\\:', ':');
            q = /([^\{]+)\{/.exec(line);
            if (q) {
                q = q[1].trim();
                current.push(q);
                gift = true;
                continue;
            }
        }

        if (gift) {
            var first = line[0];
            line = line.slice(1);
            if ('=' == first)
                answer = line;
            else if ('}' == first) {
                save();
                gift = false;
            }/*
             else if ('~' == first)
             current.push(line);*/
            continue;
        }

        q = /^(\d+)\.(.*)/.exec(line);
        // 180.         Дівчинку 5 років в ургентному плані госпіталізовано
        if (q) {
            save();
            current.push(q[2].trim());
            continue;
        }
        // 6.
        //  У дитини 6 р. запідозрено поліомієліт. Шлях поширення вірусу поліомієліту в організмі дитини
        q = /^(\d+)/.exec(line);
        if (q) {
            save();
            current.push(content[++i].trim());
            continue;
        }

        var v = /^([A-EА-Я])\.(.*)/.exec(line);
        if (v) {
            v = v.slice(1);
            if (2 == v.length) {
                v[0] = v[0].trim();
                v[1] = v[1].trim();
                if (v[1].indexOf('*') >= 0) {
                    v[1] = v[1].replace('*', '');
                    answer = v[1];
                }
                //current.push(v);
                //continue;
            }
        }
        else {
            v = /^([A-EА-Я])\./.exec(line);
            if (v) {
                var text = content[++i];
                text = text.trim();
                if (line.indexOf('*') > 0)
                    answer = text;
                //current.push(text);
                //continue;
            }
        }
        //removed.push(j + 1 + '\t' + line);
    }
    save();
    if (0 == result[0].length)
        result.shift();
    var qa = {};
    while(current = current.pop() && current.length >= 2)
        qa[current[0]] = current[current.length-1];
    for(q in qa)
        result.push(q, qa[q]);
    return result;
}
