import { VSegment } from './visual-segment';

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
}
