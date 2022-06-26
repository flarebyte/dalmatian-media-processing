import { V2dList } from '../src/vector-2d-list';

describe('vector-2d-list', () => {
  it('should provide fromDalmatianString', () => {
    const actual = V2dList.fromDalmatianString('1/4 -1/5 1/3 1/7 1/9 1/11');
    expect(actual.toString()).toStrictEqual('1/4 -1/5, 1/3 1/7, 1/9 1/11');
    expect(
      V2dList.fromDalmatianString(actual.toString(), ', ').toString()
    ).toStrictEqual(actual.toString());
  });
});
