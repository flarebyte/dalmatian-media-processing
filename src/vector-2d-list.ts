import Fraction from 'fraction.js';
import { V2d } from './vector-2d';

const range = (n: number) => [...new Array(n).keys()]; // eslint-disable-line unicorn/no-new-array

export class V2dList {
  private _values: V2d[];

  constructor(values: V2d[]) {
    this._values = values;
  }

  get values(): V2d[] {
    return this._values;
  }

  static fromDalmatianString(
    someStr: string,
    separator: string = ' '
  ): V2dList {
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

  toString() {
    return this._values.map((value) => value.toString()).join(', ');
  }
}
