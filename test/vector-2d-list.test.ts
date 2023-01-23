import Fraction from 'fraction.js';
import { V2d } from '../src/vector-2d.js';
import { V2dList } from '../src/vector-2d-list.js';

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
  it('should add 2d lists', () => {
    const sumOfList = listABCDE.add(listCDE);
    expect(sumOfList.toString()).toStrictEqual(
      listCDE.add(listABCDE).toString()
    );
    expect(sumOfList.toString()).toStrictEqual(
      '11/28 2/9, 8/65 17/138, 24/119 31/45, -1/13 -1/23, 1/17 4/5'
    );
    expect(sumOfList.at(0)?.toString()).toStrictEqual(ptA.add(ptC).toString());
    expect(sumOfList.at(-1)?.toString()).toStrictEqual(ptE.toString());
  });
  it('should substract 2d lists', () => {
    const substraction = listABCDE.sub(listCDE);
    expect(substraction.toString()).toStrictEqual(
      listCDE.sub(listABCDE).neg().toString()
    );
    expect(substraction.at(0)?.toString()).toStrictEqual(
      ptA.sub(ptC).toString()
    );
    expect(substraction.at(2)?.toString()).toStrictEqual(
      ptC.sub(ptE).toString()
    );
    expect(substraction.at(-1)?.toString()).toStrictEqual(ptE.toString());
  });

  it('should multiply 2d lists with a scalar value', () => {
    expect(listCDE.mul(new Fraction('1/1')).toString()).toStrictEqual(
      listCDE.toString()
    );
    expect(listCDE.mul(new Fraction('1/5')).toString()).toStrictEqual(
      '1/35 -1/45, -1/65 -1/115, 1/85 4/25'
    );
  });

  it('should provide negative values', () => {
    expect(listCDE.negX().negY().toString()).toStrictEqual(
      listCDE.neg().toString()
    );
    expect(listCDE.negX().toString()).toStrictEqual(
      '-1/7 -1/9, 1/13 -1/23, -1/17 4/5'
    );
  });

  it('should provide reverse', () => {
    expect(listCDE.reverse().toString()).toStrictEqual(
      new V2dList([ptE, ptD, ptC]).toString()
    );
  });

  it('should provide mirror values', () => {
    expect(listCDE.mirror().toString()).toStrictEqual(
      new V2dList([ptC, ptD, ptE, ptE, ptD, ptC]).toString()
    );
  });

  it('should calculate the containing rectangle', () => {
    expect(listCDE.getContainingRect().toString()).toStrictEqual(
      'xy -1/13 -1/9 width 20/91 height 41/45'
    );
  });
});
