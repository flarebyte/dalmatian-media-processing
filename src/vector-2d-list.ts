import Fraction from 'fraction.js';
import { compare2Fractions } from './fraction-math';
import { V2d } from './vector-2d';
import { V2dRect } from './vector-2d-rectangle';

const range = (n: number) => [...new Array(n).keys()]; // eslint-disable-line unicorn/no-new-array

const defaultFiller = V2d.fromString('0/1 0/1');
const one = new Fraction('1/1');

export class V2dList {
  private _values: V2d[];

  constructor(values: V2d[]) {
    this._values = values;
  }

  get values(): V2d[] {
    return this._values;
  }

  static fromDalmatianString(someStr: string, separator = ' '): V2dList {
    const splitted = someStr.trim().split(separator);
    if (separator === ' ') {
      const defaultFraction = new Fraction(0);
      const fractions = splitted.map((s) => new Fraction(s));
      const halfSize = range(fractions.length / 2);
      const v2dList = halfSize.map(
        (i) =>
          new V2d(
            fractions[2 * i] || defaultFraction,
            fractions[2 * i + 1] || defaultFraction
          )
      );
      return new V2dList(v2dList);
    } else {
      return new V2dList(splitted.map(V2d.fromString));
    }
  }

  static ljust(v2dlist: V2dList, length: number, filler: V2d = defaultFiller) {
    const values = v2dlist._values.map((value) => value.clone());
    while (values.length < length) {
      values.push(filler);
    }
    return new V2dList(values);
  }

  toString() {
    return this._values.map((value) => value.toString()).join(', ');
  }

  toDalmatianList() {
    return this._values.map((value) => value.toDalmatianString());
  }

  toDalmatianString(separator = ' ') {
    return this.toDalmatianList().join(separator);
  }

  at(index: number) {
    return this._values.at(index);
  }

  size() {
    return this._values.length;
  }

  clone() {
    return new V2dList(this._values.map((value) => value.clone()));
  }

  neg() {
    return new V2dList(this._values.map((value) => value.clone().neg()));
  }

  negX() {
    return new V2dList(this._values.map((value) => value.clone().negX()));
  }

  negY() {
    return new V2dList(this._values.map((value) => value.clone().negY()));
  }

  add(b: V2dList) {
    const maxLength = Math.max(this._values.length, b._values.length);
    const aList = V2dList.ljust(this, maxLength).values;
    const bList = V2dList.ljust(b, maxLength).values;
    const added = range(maxLength).map((i) =>
      (aList[i] || defaultFiller).add(bList[i] || defaultFiller)
    );
    return new V2dList(added);
  }

  sub(b: V2dList) {
    const maxLength = Math.max(this._values.length, b._values.length);
    const aList = V2dList.ljust(this, maxLength).values;
    const bList = V2dList.ljust(b, maxLength).values;
    const added = range(maxLength).map((i) =>
      (aList[i] || defaultFiller).sub(bList[i] || defaultFiller)
    );
    return new V2dList(added);
  }

  mul(scalar: Fraction) {
    const values = this._values.map((value) => value.mul(scalar));
    return new V2dList(values);
  }
  reverse() {
    return new V2dList(this.clone()._values.reverse());
  }

  mirror() {
    const reversed = this.reverse();
    return new V2dList([...this.clone().values, ...reversed.values]);
  }
  /**
   * When do we need this ?
   * @param n
   * @returns
   */
  getMedianRange(n: number) {
    const idx = Math.floor(this.values.length / n);
    const xx: Fraction[] = [...this._values]
      .map((v) => v.x)
      .sort(compare2Fractions);
    const yy: Fraction[] = [...this._values]
      .map((v) => v.y)
      .sort(compare2Fractions);
    const width = xx.at(-idx)?.sub(xx.at(idx) || one);
    const height = yy.at(-idx)?.sub(yy.at(idx) || one);
    return new V2d(width || one, height || one);
  }

  getContainingRect() {
    const xx: Fraction[] = [...this._values]
      .map((v) => v.x)
      .sort(compare2Fractions);
    const yy: Fraction[] = [...this._values]
      .map((v) => v.y)
      .sort(compare2Fractions);
    return V2dRect.fromOppositePoints(
      new V2d(xx.at(0) || one, yy.at(0) || one),
      new V2d(xx.at(-1) || one, yy.at(-1) || one)
    );
  }
}
