from re import sub, match
from os import listdir
from os.path import join
from quiz import generate

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
        if not line:
            continue
        line = line.replace(' .', '.')
        line = line.replace(' ,', ',')
        question = match(r'^\s*[^\d]*(\d+)\.(.*)$', line)
        if question:
            if current:
                save()
            current = [[question.group(1), question.group(2).strip()]]
        else:
            # variant = match(r'^\s+ANSWER.*(A-E)$', line)
            # if variant:
            #     variant = variant.group(1)
            #     for v in current:
            #         if variant == v[0]:
            #             current.append(variant)
            #     continue
            variant = match(r'^([A-EА-Я]+)\.(.*)$', line)
            # variant = match(r'^[^.]+\.(.*)$', line)
            if variant:
                variant = [variant.group(1), variant.group(2).strip()]
                if '*' in variant[1]:
                    answer = variant[0]
                    variant[1] = variant[1].replace('*', '')
                current.append(variant)
    save()
    generate(result, 'html/' + file + '.html')

    answer = None
    current = None
