import { V2d } from '../src/vector-2d';
import { V2dList } from '../src/vector-2d-list';

// const pt0 = V2d.fromString("0/1 0/1")
const ptA = V2d.fromString('1/4 1/3');
const ptB = V2d.fromString('1/5 1/6');
const ptC = V2d.fromString('1/7 -1/9');
const ptD = V2d.fromString('-1/13 -1/23');
const ptE = V2d.fromString('1/17 4/5');
const listABCDE = new V2dList([ptA, ptB, ptC, ptD, ptE]);
const listCDE = new V2dList([ptC, ptD, ptE]);

describe('vector-2d-list', () => {
  it('should provide fromDalmatianString', () => {
    const actual = V2dList.fromDalmatianString('1/4 -1/5 1/3 1/7 1/9 1/11');
    expect(actual.toString()).toStrictEqual('1/4 -1/5, 1/3 1/7, 1/9 1/11');
    expect(
      V2dList.fromDalmatianString(actual.toString(), ', ').toString()
    ).toStrictEqual(actual.toString());
  });
  it('should negate a list of V2d', () => {
    const actual = V2dList.fromDalmatianString(
      '1/4 -1/5 1/3 1/7 1/9 -1/11'
    ).neg();
    expect(actual.toString()).toStrictEqual('-1/4 1/5, -1/3 -1/7, -1/9 1/11');
  });
  it('should add 2d list', () => {
    const sumOfList = listABCDE.add(listCDE);
    expect(sumOfList.toString()).toStrictEqual(listCDE.add(listABCDE).toString());
    expect(sumOfList.toString()).toStrictEqual(
      '11/28 2/9, 8/65 17/138, 24/119 31/45, -1/13 -1/23, 1/17 4/5'
    );
    expect(sumOfList.at(0)?.toString()).toStrictEqual(ptA.add(ptC).toString());
    expect(sumOfList.at(-1)?.toString()).toStrictEqual(ptE.toString());
  });
});
