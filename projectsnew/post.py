# This post-processor was made with the help of ChatGPT.
from bs4 import BeautifulSoup
with open('debug.html', 'r', encoding='utf-8') as f:
    debug_content = f.read()


soup = BeautifulSoup(debug_content, 'html.parser')

def dump_stream(id):
    stream_div = soup.find('div', {'id': id})
    stream_children_content = ''.join(str(child) for child in stream_div.children)

    print(f'{id} div fetched. Dumping to ./content/{id}.html')
    with open(f'./content/{id}.html', 'w', encoding='utf-8') as f:
        f.write(stream_children_content)
    print(f'{id} children dumped successfully.')

    for child in stream_div.children:
        child.replaceWith('')
    print(f'Cleared {id} div children.')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Index dumped successfully to ./index.html")
print('--- Finished.')
