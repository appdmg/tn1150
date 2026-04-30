# @appdmg/tn1150

HFS Plus TN1150 string comparison and normalization helpers for appdmg packages.

This package stays as a small compatibility boundary because `compare()` carries
the TN1150 case-insensitive ordering table used by `.DS_Store` behavior. The old
runtime dependency on `unorm` was removed; `normalize()` now uses Node.js
`String.prototype.normalize('NFD')`.

## Installation

```bash
npm install @appdmg/tn1150
```

## Usage

```js
const tn1150 = require('@appdmg/tn1150')

filenames.sort(tn1150.compare)

const normalized = tn1150.normalize(filename)
```

## API

### `tn1150.compare(lhs, rhs)`

Compares two strings using the case-insensitive ordering table from Apple's
TN1150 `FastUnicodeCompare` routine.

### `tn1150.normalize(text)`

Returns `text.normalize('NFD')`, which matches the previous `unorm.nfd` behavior
for the compatibility cases covered by this package's tests.

## Migration Notes

The package name changed from `tn1150` to `@appdmg/tn1150`.

The supported runtime changed to Node.js 24 and newer.

The runtime dependency on `unorm` was removed. Normalization now uses the
Node.js built-in Unicode canonical decomposition support.
