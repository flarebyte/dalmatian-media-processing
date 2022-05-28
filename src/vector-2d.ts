import Fraction from 'fraction.js';
import { cosFract, sinFract } from './fraction-math';

export class V2d {
  private _x: Fraction;
  private _y: Fraction;
  constructor(x: Fraction, y: Fraction) {
    this._x = x;
    this._y = y;
  }

  static fromString(value: string) {
    const [x, y] = value.trim().split(' ');
    if (x === undefined || x.length === 0) {
      throw new Error(`Fraction x/a in x/a y/b should not be empty for $value`);
    }
    if (y === undefined || y.length === 0) {
      throw new Error(`Fraction y/b in x/a y/b should not be empty for $value`);
    }
    return new V2d(new Fraction(x), new Fraction(y));
  }

  static fromAmplitudeAngle(amplitude: Fraction, angle: Fraction) {
    const x = amplitude.mul(cosFract(angle));
    const y = amplitude.mul(sinFract(angle));
    return new V2d(x, y);
  }
  get x(): Fraction {
    return this._x;
  }
  get y(): Fraction {
    return this._y;
  }

  clone(): V2d {
    return new V2d(this._x, this._y);
  }

  toDalmatianString() {
    return `${this._x.toFraction()} ${this._y.toFraction()}`;
  }

  toString() {
    return this.toDalmatianString();
  }

  toCartesianString(dpu: number) {
    const x = this._x.mul(dpu).valueOf().toFixed(3);
    const y = this._y.mul(dpu).valueOf().toFixed(3);
    return `(${x},${y})`;
  }
}
