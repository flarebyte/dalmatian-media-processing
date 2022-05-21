import Fraction from 'fraction.js';

export class V2d {
  private _x: Fraction;
  private _y: Fraction;
  constructor(x: Fraction, y: Fraction) {
    this._x = x;
    this._y = y;
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
    return `${this._x} ${this._y}`;
  }
  
}
