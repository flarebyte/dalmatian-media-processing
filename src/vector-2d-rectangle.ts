import Fraction from 'fraction.js';
import { V2d } from './vector-2d';

export class V2dRect {
  private _xy: V2d;
  private _width: Fraction;
  private _height: Fraction;
  constructor(xy: V2d, width: Fraction, height: Fraction) {
    this._xy = xy;
    this._width = width;
    this._height = height;
  }
  get xy(): V2d {
    return this._xy;
  }
  get width(): Fraction {
    return this._width;
  }
  get height(): Fraction {
    return this._height;
  }

  equals(other: V2dRect) {
    const thisOne = [this._xy, this._width, this._height];
    const otherOne = [other._xy, other._width, other._height];
    return thisOne === otherOne;
  }

  toString() {
    return `xy ${
      this._xy
    } width ${this._width.toFraction()} height ${this.height.toFraction()}`;
  }

  static fromOppositePoints(leftBottom: V2d, rightTop: V2d) {
    const width = rightTop.x.add(leftBottom.x.neg());
    const height = rightTop.y.add(leftBottom.y.neg());
    return new V2dRect(leftBottom, width, height);
  }
}
