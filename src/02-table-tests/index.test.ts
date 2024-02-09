import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 12, b: 13, action: Action.Subtract, expected: -1 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 7, action: Action.Multiply, expected: 42 },
  { a: -5, b: 6, action: Action.Multiply, expected: -30 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: -30, b: -6, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: '9', b: 2, action: Action.Exponentiate, expected: null },
  { a: 5, b: '2', action: Action.Exponentiate, expected: null },
  { a: 7, b: 6, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should return %p', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
