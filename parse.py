from os import listdir
from os.path import join
from re import sub, search

for file in listdir('input'):
    with open(join('input', file), 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.split('\n\n')
    results = []
    for result in content:
        result = sub(r"\s+", ' ', result)
        result = result.strip()
        if search(r"^[A-E]\.", result):
            if '*' in result:
                results.append(result)
        else:
            results.append('\n' + result)
    print(file)
    for result in results:
        if search(r"[α-ωΑ-Ω]", result):
            print(result)
    cp1251file = join('cp1251', file)
    results = '\n'.join(results)
    with open(cp1251file, 'w+', encoding='cp1251', errors='ignore') as f:
        f.write(results)
