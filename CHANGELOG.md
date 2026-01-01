# Changelog

All notable changes to this project should be documented in this file.

## [Unreleased] - 2026-01-01

### Changed
- Refactor UI: replaced inline HTML event handlers with DOM-attached listeners for improved reliability and security. ✅
- Sanitize dynamic DOM insertion by replacing unsafe `innerHTML` usage with DOM-safe construction (`textContent`, `createElement`). ✅
- Add unit/smoke tests (`tests/test_sanity.py`, `tests/test_parsers.py`) and a basic HTTP smoke check. ✅

### Fixed
- Remove button and other controls not being clickable due to inline handler issues. ✅
- Prevented potential HTML injection/XSS by avoiding direct HTML string concatenation. ✅

---
