// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Substract, expected: 1 },
  { a: 13, b: 24, action: Action.Substract, expected: -11 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 0, b: 24, action: Action.Multiply, expected: 0 },
  { a: 24, b: 2, action: Action.Divide, expected: 12 },
  { a: -10, b: 10, action: Action.Divide, expected: -1 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 12, b: 0, action: Action.Exponentiate, expected: 1 },
];

const nullTestCases = [
  { a: 1, b: 2, action: '6' },
  { a: 2, b: 'number', action: Action.Divide },
  { a: undefined, b: 2, action: Action.Substract },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should test all actions in simple calculator',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  test.each(nullTestCases)('should return null', ({ a, b, action }) => {
    expect(simpleCalculator({ a, b, action })).toBeNull();
  });
});
