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
}
