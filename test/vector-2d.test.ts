import { V2d } from '../src/vector-2d';

describe('vector-2d', () => {
  it('should provide', () => {
    const actual = V2d.fromString('1/2 1/4')
    expect(actual).toBeDefined()
  });
});
