import { V2d } from './vector-2d';
import { countOfPoints, VSegment } from './visual-segment';

const isV2d = (value: unknown): value is V2d =>
  typeof value !== 'undefined' || value !== null;

export class VPath {
  private _segments: VSegment[];

  constructor(segments: VSegment[]) {
    this._segments = segments;
  }

  get segments() {
    return this._segments;
  }

  size() {
    return this._segments.length;
  }

  toDalmatianString() {
    const core = this._segments
      .map((segment) => segment.toDalmatianString())
      .join(',');
    return `[ ${core} ]`;
  }

  toString() {
    return this.toDalmatianString();
  }
  static fromDalmatianString(someStr: string): VPath {
    const parts = someStr.replace('[', '').replace(']', '').trim().split(',');
    const segments = parts.map((segment) =>
      VSegment.fromDalmatianString(segment)
    );
    return new VPath(segments);
  }

  toCorePoints() {
    return this._segments
      .filter((segment) => countOfPoints(segment.action) > 0)
      .map((segment) => segment.pt)
      .filter(isV2d);
  }

  toCoreCartesianString(dpu: number, separator = '') {
    return this.toCorePoints()
      .map((pt) => pt.toCartesianString(dpu))
      .join(separator);
  }
  toCoreSvgString(dpu: number, yPixOffset: number) {
    return (
      this.toCorePoints()
        .map((pt) => pt.toSvgString(dpu, yPixOffset))
        .map((svgPoint) => `L ${svgPoint}`)
        .join(' ')
        .replace('L', 'M') + ' Z'
    );
  }
  toSvgString(dpu: number, yPixOffset: number) {
    return this._segments
      .map((segment) => segment.toSvgString(dpu, yPixOffset))
      .join(' ');
  }
}
