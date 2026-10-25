#!/usr/bin/env python3
"""Pull the game's data tables and English strings out of a local D2R install.

    CASCLIB=/path/to/libcasc.so python3 tools/extract.py [GAME_DIR]

Writes raw/ (not committed: the tables are Blizzard's):
    raw/excel/         the Reign of the Warlock tables (what RotW characters load)
    raw/excel-base/    excel/base/, the tables for non-RotW characters
    raw/strings/       English strings, HD text
    raw/strings-legacy English strings shown with legacy graphics
    raw/global/        animdata.d2 (attack frame data, read by the tooltip engine) and
                       desecratedzones.json (terror zones)
    raw/version.txt    the game build the files came from
"""
import json
import os
import re
import shutil
import sys

from casc import Storage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_GAME = os.path.expanduser('~/.local/share/Steam/steamapps/common/Diablo II Resurrected')
RAW = os.path.join(ROOT, 'raw')


def write(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data)


def files_in(storage, folder, ext):
    """Files directly in `folder` (not its subfolders) with extension `ext`."""
    prefix = f'data:data\\{folder}\\'
    for name in storage.find(prefix + '*' + ext):
        rel = name[len(prefix):]
        if '\\' not in rel:
            yield name, rel


def english_only(data):
    rows = json.loads(data.decode('utf-8-sig'))
    rows = [{'id': r['id'], 'Key': r['Key'], 'enUS': r.get('enUS', '')} for r in rows]
    return json.dumps(rows, ensure_ascii=False, indent=0).encode('utf-8')


def game_version(game):
    """FileVersion from D2R.exe's version resource, e.g. 3.3.94995."""
    with open(os.path.join(game, 'D2R.exe'), 'rb') as f:
        exe = f.read()
    at = exe.find('FileVersion'.encode('utf-16le'))
    text = exe[at:at + 96].decode('utf-16le', 'replace')
    m = re.search(r'\d+\.\d+\.\d+', text)
    return m.group(0) if m else 'unknown'


def main():
    game = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_GAME
    s = Storage(game)
    shutil.rmtree(RAW, ignore_errors=True)

    n = 0
    for folder, out in (('global\\excel', 'excel'), ('global\\excel\\base', 'excel-base')):
        for name, rel in files_in(s, folder, '.txt'):
            write(os.path.join(RAW, out, rel.lower()), s.read(name))
            n += 1
    for d in ('strings', 'strings-legacy'):
        for name, rel in files_in(s, f'local\\lng\\{d}', '.json'):
            write(os.path.join(RAW, d, rel), english_only(s.read(name)))
            n += 1
    write(os.path.join(RAW, 'global', 'animdata.d2'), s.read('data:data\\global\\animdata.d2'))
    write(os.path.join(RAW, 'global', 'desecratedzones.json'), s.read('data:data\\hd\\global\\excel\\desecratedzones.json'))
    version = game_version(game)
    write(os.path.join(RAW, 'version.txt'), (version + '\n').encode())
    print(f'{n} files from {version}')


if __name__ == '__main__':
    main()
