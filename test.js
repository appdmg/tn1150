'use strict'

const test = require('ava').default
const tn1150 = require('./')

test('compare applies TN1150 case-insensitive ordering', (t) => {
  t.is(tn1150.compare('test', 'test'), 0)
  t.is(tn1150.compare('test', 'Test'), 0)
  t.is(tn1150.compare('Test', 'test'), 0)
  t.true(tn1150.compare('test2', 'test1') > 0)
  t.true(tn1150.compare('test1', 'test2') < 0)
  t.true(tn1150.compare('Hello', 'Hellö') < 0)
  t.true(tn1150.compare('Hellö', 'Hello') > 0)
  t.true(tn1150.compare('abc', 'abcd') < 0)
  t.true(tn1150.compare('abcd', 'abc') > 0)
  t.true(tn1150.compare('BBB', 'aaa') > 0)
  t.true(tn1150.compare('BBB', 'ccc') < 0)
})

test('compare preserves special TN1150 mapping cases', (t) => {
  t.is(tn1150.compare('Ϧaa', 'ϧaa'), 0)
  t.is(tn1150.compare('ϧaa', 'Ϧaa'), 0)
  t.is(tn1150.compare('\u200c', '\u200d'), 0)
  t.is(tn1150.compare('\u202a', '\u202e'), 0)
  t.is(tn1150.compare('Ａ', 'Ｚ'), 0)
  t.is(tn1150.compare('Ⅰ', 'Ⅻ'), 0)
})

test('normalize uses Node canonical decomposition', (t) => {
  const cases = [
    ['é', 'e\u0301'],
    ['Å', 'A\u030a'],
    ['ö', 'o\u0308'],
    ['Å', 'A\u030a'],
    ['가', '\u1100\u1161'],
    ['한', '\u1112\u1161\u11ab'],
    ['\u0344', '\u0308\u0301'],
    ['\u1e9b\u0323', '\u017f\u0323\u0307']
  ]

  for (const [input, expected] of cases) {
    t.is(tn1150.normalize(input), expected)
    t.is(tn1150.normalize(input), input.normalize('NFD'))
  }
})
