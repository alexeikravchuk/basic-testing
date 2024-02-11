// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input1 = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(input1)).toBe(3);

    const input2 = { a: -5, b: 5, action: Action.Add };
    expect(simpleCalculator(input2)).toBe(0);
  });

  test('should subtract two numbers', () => {
    const input1 = { a: 5, b: 2, action: Action.Subtract };
    expect(simpleCalculator(input1)).toBe(3);

    const input2 = { a: 0, b: 10, action: Action.Subtract };
    expect(simpleCalculator(input2)).toBe(-10);
  });

  test('should multiply two numbers', () => {
    const input1 = { a: 3, b: 2, action: Action.Multiply };
    expect(simpleCalculator(input1)).toBe(6);

    const input2 = { a: 7, b: -1, action: Action.Multiply };
    expect(simpleCalculator(input2)).toBe(-7);
  });

  test('should divide two numbers', () => {
    const input1 = { a: 6, b: 2, action: Action.Divide };
    expect(simpleCalculator(input1)).toBe(3);

    const input2 = { a: 1000, b: -2, action: Action.Divide };
    expect(simpleCalculator(input2)).toBe(-500);
  });

  test('should exponentiate two numbers', () => {
    const input1 = { a: 2, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(input1)).toBe(8);

    const input2 = { a: 6, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(input2)).toBe(36);
  });

  test('should return null for invalid action', () => {
    const input1 = { a: 6, b: 2, action: '%' };
    expect(simpleCalculator(input1)).toBeNull();

    const input2 = { a: 0, b: 0, action: 'x' };
    expect(simpleCalculator(input2)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input1 = { a: '2', b: 3, action: Action.Add };
    expect(simpleCalculator(input1)).toBeNull();

    const input2 = { a: 6, b: null, action: Action.Divide };
    expect(simpleCalculator(input2)).toBeNull();
  });
});
