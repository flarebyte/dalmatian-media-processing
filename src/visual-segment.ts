import Fraction from 'fraction.js';
import { V2d } from './vector-2d';
import { V2dList } from './vector-2d-list';

const fractionZero = new Fraction(0);
export type SegmentShape = 'Z' | 'M' | 'L' | 'C' | 'S' | 'Q' | 'T' | 'E';

export class VSegment {
  private _action: SegmentShape;
  private _pt?: V2d;
  private _pt1?: V2d;
  private _pt2?: V2d;
  constructor(action: SegmentShape, pt?: V2d, pt1?: V2d, pt2?: V2d) {
    this._action = action;
    this._pt = pt;
    this._pt1 = pt1;
    this._pt2 = pt2;
  }
  get pt() {
    return this._pt;
  }

  get pt1() {
    return this._pt1;
  }
  get pt2() {
    return this._pt2;
  }
  get action() {
    return this._action;
  }

  static fromClose() {
    return new VSegment('Z');
  }

  static fromMoveTo(pt: V2d) {
    return new VSegment('M', pt);
  }

  static fromLineTo(pt: V2d) {
    return new VSegment('L', pt);
  }

  static fromCubicBezier(pt: V2d, pt1: V2d, pt2: V2d) {
    return new VSegment('C', pt, pt1, pt2);
  }
  static fromSmoothBezier(pt: V2d, pt1: V2d) {
    return new VSegment('S', pt, pt1);
  }
  static fromQuadraticBezier(pt: V2d, pt1: V2d) {
    return new VSegment('Q', pt, pt1);
  }

  static fromFluidBezier(pt: V2d) {
    return new VSegment('T', pt);
  }

  static fromNotSupported() {
    return new VSegment('E');
  }
  static fromDalmatianString(text: string) {
    if (text == 'Z') {
      return VSegment.fromClose();
    }
    const dstr = text.trim();
    const action: string = dstr[0] || 'E';
    const points = V2dList.fromDalmatianString(dstr.slice(1));
    const length = points.size();
    const ptAt0 = points.at(0);
    const ptAt1 = points.at(1);
    const ptAt2 = points.at(2);
    if (action === 'M' && length === 1 && ptAt0 !== undefined) {
      return VSegment.fromMoveTo(ptAt0);
    } else if (action === 'L' && length === 1 && ptAt0 !== undefined) {
      return VSegment.fromLineTo(ptAt0);
    } else if (action === 'T' && length === 1 && ptAt0 !== undefined) {
      return VSegment.fromFluidBezier(ptAt0);
    } else if (
      action === 'S' &&
      length === 2 &&
      ptAt0 !== undefined &&
      ptAt1 !== undefined
    ) {
      return VSegment.fromSmoothBezier(ptAt1, ptAt0);
    } else if (
      action === 'Q' &&
      length === 2 &&
      ptAt0 !== undefined &&
      ptAt1 !== undefined
    ) {
      return VSegment.fromQuadraticBezier(ptAt1, ptAt0);
    } else if (
      action === 'C' &&
      length === 3 &&
      ptAt0 !== undefined &&
      ptAt1 !== undefined &&
      ptAt2 !== undefined
    ) {
      return VSegment.fromCubicBezier(ptAt2, ptAt0, ptAt1);
    }
    return VSegment.fromNotSupported();
  }
  isEqual(other: VSegment): boolean {
    return (
      this._action === other.action &&
      this._pt === other._pt &&
      this._pt1 === other._pt1 &&
      this._pt2 === other._pt2
    );
  }
  toDalmatianString() {
    if (this._action == 'Z') {
      return this._action;
    } else if (['M', 'L', 'T'].includes(this._action)) {
      return `${this._action} ${this._pt?.toDalmatianString()}`;
    } else if (['S', 'Q'].includes(this._action)) {
      return `${
        this._action
      } ${this._pt1?.toDalmatianString()} ${this._pt?.toDalmatianString()}`;
    }
    return this._action == 'C'
      ? `${
          this._action
        } ${this._pt1?.toDalmatianString()} ${this._pt2?.toDalmatianString()} ${this._pt?.toDalmatianString()}`
      : 'E';
  }
  toSvgString(dpu: number, yPixOffset: number) {
    if (this._action == 'Z') {
      return this._action;
    } else if (['M', 'L', 'T'].includes(this._action)) {
      return `${this._action} ${this._pt?.toSvgString(dpu, yPixOffset)}`;
    } else if (['S', 'Q'].includes(this._action)) {
      return `${this._action} ${this._pt1?.toSvgString(
        dpu,
        yPixOffset
      )} ${this._pt?.toSvgString(dpu, yPixOffset)}`;
    }
    return this._action == 'C'
      ? `${this._action} ${this._pt1?.toSvgString(
          dpu,
          yPixOffset
        )} ${this._pt2?.toSvgString(dpu, yPixOffset)} ${this._pt?.toSvgString(
          dpu,
          yPixOffset
        )}`
      : 'E';
  }
  rotate(angle: Fraction) {
    if (angle === fractionZero) {
      return this;
    }
    const pt = this._pt === undefined ? undefined : this._pt.rotate(angle);
    const pt1 = this._pt1 === undefined ? undefined : this._pt1.rotate(angle);
    const pt2 = this._pt2 === undefined ? undefined : this._pt2.rotate(angle);

    return new VSegment(this._action, pt, pt1, pt2);
  }
  translate(offset: V2d) {
    const pt = this._pt !== undefined ? this._pt.add(offset) : undefined;
    const pt1 = this._pt1 !== undefined ? this._pt1.add(offset) : undefined;
    const pt2 = this._pt2 !== undefined ? this._pt2.add(offset) : undefined;
    return new VSegment(this._action, pt, pt1, pt2);
  }
  scale(scaleFactor: Fraction) {
    const pt = this._pt !== undefined ? this._pt.mul(scaleFactor) : undefined;
    const pt1 =
      this._pt1 !== undefined ? this._pt1.mul(scaleFactor) : undefined;
    const pt2 =
      this._pt2 !== undefined ? this._pt2.mul(scaleFactor) : undefined;
    return new VSegment(this._action, pt, pt1, pt2);
  }
  isMostlyInsideRect(xy: V2d, width: Fraction, height: Fraction) {
    if (this._pt !== undefined) {
      return this._pt?.isInsideRect(xy, width, height);
    } else {
      return true;
    }
  }
}
