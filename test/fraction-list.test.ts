import { FractionList } from '../src/fraction-list.js';

describe('fraction-list', () => {
  it('should provide fromString', () => {
    const fractlist = '1/4 -1/3 1/5 1/6 4/5';
    const actual = FractionList.fromString(fractlist);
    expect(actual.toString()).toStrictEqual(fractlist);
  });
});
