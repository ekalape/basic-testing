// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const els = [2, 4, 6];
  const result = { value: 2, next: { value: 4, next: { value: 6, next: { value: null, next: null } } } }
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(els);
    expect(list).toStrictEqual(result);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(els);
    expect(list).toMatchSnapshot()
  });
});
