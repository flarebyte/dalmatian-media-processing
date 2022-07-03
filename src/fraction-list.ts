import Fraction from 'fraction.js';

export class FractionList {
  private _values: Fraction[];
  constructor(values: Fraction[]) {
    this._values = values;
  }
  get values(): Fraction[] {
    return this._values;
  }

  static fromString(stringFractions: string, separator = ' ') {
    const fractions = stringFractions
      .split(separator)
      .map((v) => new Fraction(v));
    return new FractionList(fractions);
  }
  size() {
    return this._values.length;
  }

  toString() {
    return this._values.map((v) => v.toFraction()).join(' ');
  }

  toList() {
    return [...this._values];
  }
}
