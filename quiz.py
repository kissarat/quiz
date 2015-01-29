from json import dump
from os import listdir
from os.path import join
from re import match, sub
from xml.etree.ElementTree import Element, tostring

answer = None
current = None

for file in listdir('input'):
    with open(join('input', file), 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.split('\n')
    result = []

    def save():
        current.append(answer)
        result.append(current)
    for line in content:
        line = sub(r'\s+', ' ', line)
        line = line.replace(' .', '.')
        line = line.replace(' ,', ',')
        question = match(r'^[^\d]*(\d+)\.(.*)$', line)
        if question:
            if current:
                save()
            current = [[question.group(1), question.group(2).strip()]]
        else:
            variant = match(r'^([A-E]+)\.(.*)$', line)
            if variant:
                variant = [variant.group(1), variant.group(2).strip()]
                if '*' in variant[1]:
                    answer = variant[0]
                    variant[1] = variant[1].replace('*', '')
                current.append(variant)
    save()

    with open(join('utf-8', file + '.json'), 'w', encoding='utf-8') as f:
        dump(result, f, indent=True, allow_nan=True, ensure_ascii=False)

    html = Element('html')
    head = Element('head')
    head.append(Element('meta', charset='utf-8'))
    # style = Element('style', type='text/css')
    # style.text = 'ol {margin: 0; padding: 0; line-height: 1em}'
    # head.append(style)
    html.append(head)
    body = Element('body')
    ol1 = Element('ol')
    for question in result:
        li1 = Element('li')
        span = Element('span')
        span.text = question[0][1]
        li1.append(span)
        ol2 = Element('ol', type='A')
        for i in range(1, len(question) - 1):
            li2 = Element('li')
            li2.text = question[i][1]
            ol2.append(li2)
        li1.append(ol2)
        span = Element('span')
        span.text = 'ANSWER: ' + question[-1]
        li1.append(span)
        ol1.append(li1)
    body.append(ol1)
    html.append(body)
    with open(join('html', file + '.html'), 'w', encoding='utf-8') as f:
        f.write(tostring(html, method='html', encoding='utf8', short_empty_elements=True).decode('utf8'))
