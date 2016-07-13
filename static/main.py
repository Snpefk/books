import xml.etree.ElementTree as etree

tree = etree.parse('qst.xml')
root = tree.getroot()

while True:
    if len(root) > 1:
        for i, child in enumerate(root):
            if child.tag == 'node':
                print('({}) {}'.format(i, child.attrib.get('title')))
            elif child.tag == 'answer':
                if child.attrib.get('type') == 'true':
                    answer = 'Да'
                elif child.attrib.get('type') == 'false':
                    answer = 'Нет'
                else:
                    answer = 'Возможно'
                print('({}) {}. {}'.format(i, answer, child.attrib.get('title', '')))

        print('---------------')
        choose = int(input())
        root = root[choose]
    elif len(root) == 0:
        print('the end')
        break
    else:
        if root[0].tag == 'book':
            print('{} - {}'.format(root[0].attrib.get('author'), root[0].attrib.get('title')))
        else:
            print(root[0].attrib.get('title'))

        print('---------------')
        root = root[0]
input()
