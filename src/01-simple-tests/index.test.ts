// Uncomment the code below and write your tests

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 4, b: 4, action: Action.Add })).toBe(8);
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Add })).toBe(10);
  });

  test('should substract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Substract })).toBe(2);
    expect(simpleCalculator({ a: 4, b: 4, action: Action.Substract })).toBe(0);
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Substract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Multiply })).toBe(8);
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Multiply })).toBe(1);
    expect(simpleCalculator({ a: -3, b: -3, action: Action.Multiply })).toBe(9);
    expect(simpleCalculator({ a: 0, b: 7, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 4, b: 4, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 0, b: 7, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 7, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate })).toBe(
      16,
    );
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 7, action: Action.Exponentiate })).toBe(
      0,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: '#' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Divide })).toBeNull();
    expect(simpleCalculator({ a: 8, b: 'b', action: Action.Substract }))
      .toBeNull();
    expect(
      simpleCalculator({ a: null, b: undefined, action: Action.Exponentiate }),
    ).toBeNull();
  });
});
