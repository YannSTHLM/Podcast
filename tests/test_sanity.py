#!/usr/bin/env python3
import re
import sys

PATH = 'index.html'
text = open(PATH, 'r', encoding='utf-8').read()

# Remove script blocks to avoid matching JS strings like 'onclick="..."'
clean = re.sub(r'<script[\s\S]*?</script>', '', text, flags=re.IGNORECASE)

# 1) No HTML inline onclick attributes
if re.search(r'<\w+[^>]*\sonclick\s*=\s*"', clean):
    print('FAIL: Found inline HTML onclick attributes')
    matches = re.findall(r'<\w+[^>]*\sonclick\s*=\s*"([^"]*)"', clean)
    print('Examples:', matches[:5])
    sys.exit(2)

# 2) Episode renderer should not inject ep.fullContent via innerHTML
if re.search(r"<button class=\"toggle-notes\" onclick=", text):
    print('FAIL: Found inline toggle-notes onclick in source')
    sys.exit(2)

# 3) showImportSummary should not build HTML via parts.join
if re.search(r"parts\.join\(", text):
    print('FAIL: Found parts.join usage in showImportSummary')
    sys.exit(2)

# 4) Ensure we added expected IDs
expected_ids = ['manage-feeds-btn','add-feed-btn','import-opml-btn','export-opml-btn','opml-upload-btn','reset-feeds-btn']
missing = [i for i in expected_ids if f'id="{i}"' not in text]
if missing:
    print('FAIL: Missing expected IDs in HTML:', missing)
    sys.exit(2)

print('PASS: sanity checks OK')
sys.exit(0)