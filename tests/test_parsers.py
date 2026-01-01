#!/usr/bin/env python3
import unittest
from xml.dom import minidom

# Minimal parser smoke tests
import re

HTML = open('index.html', 'r', encoding='utf-8').read()

class ParserSmokeTest(unittest.TestCase):
    def test_escapeHtml(self):
        # ensure escapeHtml exists
        self.assertIn('function escapeHtml', HTML)
    def test_parseXML_func_exists(self):
        self.assertIn('function parseXML', HTML)
    def test_fetchRSS_exists(self):
        self.assertIn('function fetchRSS', HTML)

if __name__ == '__main__':
    unittest.main()
