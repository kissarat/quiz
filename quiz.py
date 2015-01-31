from sys import argv
from json import load, loads
from os.path import join
from xml.etree.ElementTree import Element, tostring


def generate(data, file):
    # with open(join('utf-8', file + '.json'), 'w', encoding='utf-8') as f:
    #     dump(data, f, indent=True, allow_nan=True, ensure_ascii=False)
    html = Element('html')
    head = Element('head')
    head.append(Element('meta', charset='utf-8'))
    # style = Element('style', type='text/css')
    # style.text = 'ol {margin: 0; padding: 0; line-height: 1em}'
    # head.append(style)
    html.append(head)
    body = Element('body')
    ol1 = Element('ol')
    for question in data:
        li1 = Element('li')
        span = Element('span')
        span.text = question[0][1]
        li1.append(span)
        ol2 = Element('ol', type='A')
        for i in range(1, len(question) - 1):
            li2 = Element('li')
            # if question[i] and 2 == len(question[i]):
            q = question[i]
            if 2 == len(q):
                li2.text = q[1]
            ol2.append(li2)
        li1.append(ol2)
        span = Element('span')
        # if question[-1]:
        span.text = 'ANSWER: ' + question[-1]
        li1.append(span)
        ol1.append(li1)
    body.append(ol1)
    html.append(body)
    with open(file, 'w', encoding='utf-8') as fout:
        fout.write(tostring(html, method='html', encoding='utf8', short_empty_elements=True).decode('utf8'))
# argv = [None, 'json/2.txt.json', 'html/2.html']
if 3 == len(argv):
    with open(argv[1], 'r', encoding='utf-8') as f:
        data = load(f)
    generate(data, argv[2])
