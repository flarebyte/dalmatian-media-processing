import Fraction from 'fraction.js';
import { atanFract, cosFract, sinFract } from './fraction-math.js';

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

  toSvgString(dpu: number, yPixOffset: number) {
    const x = this._x.mul(dpu).valueOf().toFixed(3);
    const y = (yPixOffset + this._y.mul(-1).mul(dpu).valueOf()).toFixed(3);
    return `${x} ${y}`;
  }

  toFloatString() {
    const x = this._x.valueOf().toFixed(3);
    const y = this._y.valueOf().toFixed(3);
    return `${x} ${y}`;
  }

  add(b: V2d) {
    return new V2d(this._x.add(b._x), this._y.add(b._y));
  }

  sub(b: V2d) {
    return new V2d(this._x.sub(b._x), this._y.sub(b._y));
  }

  mul(scalar: Fraction) {
    return new V2d(this._x.mul(scalar), this._y.mul(scalar));
  }
  equals(other: V2d) {
    return this._x.equals(other._x) && this._y.equals(other._y);
  }

  neg() {
    return new V2d(this._x.mul(-1), this._y.mul(-1));
  }

  negX() {
    return new V2d(this._x.mul(-1), this._y);
  }

  negY() {
    return new V2d(this._x, this._y.mul(-1));
  }

  squareMagnitude() {
    return this._x.pow(2).add(this._y.pow(2));
  }

  getAngle() {
    const x = this._x.equals(0) ? new Fraction(1, 1_000_000) : this._x;
    return atanFract(this.y.div(x));
  }

  rotate(angle: Fraction) {
    if (angle.equals(0)) {
      return this;
    }
    const xNew = this._x.mul(cosFract(angle)).sub(this._y.mul(sinFract(angle)));
    const yNew = this._x.mul(sinFract(angle)).add(this._y.mul(cosFract(angle)));
    return new V2d(xNew, yNew);
  }

  isInsideRect(xy: V2d, width: Fraction, height: Fraction) {
    return (
      this._x >= xy._x &&
      this._x <= xy._x.add(width) &&
      this._y >= xy._y &&
      this._y <= xy._y.add(height)
    );
  }
}
