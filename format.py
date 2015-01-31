from json import dump
from os import listdir
from os.path import join
from re import match, sub
from xml.etree.ElementTree import Element, tostring
from string import ascii_letters
from quiz import generate

for file in listdir('input'):
    with open(join('input', file), 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.split('\n')
    current = None
    result = []

    for line in content:
        question = match(r'^\s*[^\d]*(\d+)\.(.*)$', line)
        if question and not current:
            current = [[question.group(1), question.group(2).strip()]]
            continue

        variant = match(r'^([A-EА-Я])\.(.*)$', line)
        if variant:
            variant = [variant.group(1), variant.group(2).strip()]
            current.append(variant)

        variant = match(r'^\s+ANSWER.*(A-E)', line)
        if variant:
            current.append(variant.group(1))
            result.append(current)
            continue

    generate(result, file)