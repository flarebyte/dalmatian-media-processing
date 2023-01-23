import Fraction from 'fraction.js';
import { V2d } from '../src/vector-2d.js';
import { V2dList } from '../src/vector-2d-list.js';
import { VSegment } from '../src/visual-segment.js';

const ptA = V2d.fromString('1/4 1/3');
const ptB = V2d.fromString('1/5 1/6');
const ptC = V2d.fromString('1/7 -1/9');
const ptD = V2d.fromString('-1/13 -1/23');
const ptE = V2d.fromString('1/17 4/5');
// const listABCDE = new V2dList([ptA, ptB, ptC, ptD, ptE]);
const listCDE = new V2dList([ptC, ptD, ptE]);

describe('visual-segment', () => {
  it('should provide toDalmatianString', () => {
    const opts = {};
    const actual = opts;
    expect(actual).toMatchInlineSnapshot(`Object {}`);
    expect(VSegment.fromLineTo(ptC).toDalmatianString()).toStrictEqual(
      'L 1/7 -1/9'
    );
    expect(VSegment.fromMoveTo(ptA).toDalmatianString()).toStrictEqual(
      'M 1/4 1/3'
    );
    expect(VSegment.fromClose().toDalmatianString()).toStrictEqual('Z');
    expect(
      VSegment.fromCubicBezier(ptE, ptC, ptD).toDalmatianString()
    ).toStrictEqual('C ' + listCDE.toDalmatianString());
    expect(
      VSegment.fromSmoothBezier(ptE, ptC).toDalmatianString()
    ).toStrictEqual('S 1/7 -1/9 1/17 4/5');
    expect(
      VSegment.fromQuadraticBezier(ptE, ptC).toDalmatianString()
    ).toStrictEqual('Q 1/7 -1/9 1/17 4/5');
  });
  it('should provide fromDalmatianString', () => {
    expect(VSegment.fromDalmatianString('Z').toDalmatianString()).toStrictEqual(
      'Z'
    );
    expect(
      VSegment.fromDalmatianString('L 1/7 -1/9').toDalmatianString()
    ).toStrictEqual('L 1/7 -1/9');
    expect(
      VSegment.fromDalmatianString('M -1/7 -1/9').toDalmatianString()
    ).toStrictEqual('M -1/7 -1/9');
    expect(
      VSegment.fromDalmatianString('T 1/4 1/111').toDalmatianString()
    ).toStrictEqual('T 1/4 1/111');
    expect(
      VSegment.fromDalmatianString('S 1/4 1/113 1/2 2/113').toDalmatianString()
    ).toStrictEqual('S 1/4 1/113 1/2 2/113');
    expect(
      VSegment.fromDalmatianString('Q 1/4 1/115 1/2 2/115').toDalmatianString()
    ).toStrictEqual('Q 1/4 1/115 1/2 2/115');
    expect(
      VSegment.fromDalmatianString(
        'C 1/4 1/117 1/2 2/117 3/4 1/39'
      ).toDalmatianString()
    ).toStrictEqual('C 1/4 1/117 1/2 2/117 3/4 1/39');
  });
  it('should provide toSvgString', () => {
    const dpu = 100;
    expect(VSegment.fromLineTo(ptC).toSvgString(dpu, 0)).toStrictEqual(
      'L 14.286 11.111'
    );
    expect(VSegment.fromMoveTo(ptA).toSvgString(dpu, 0)).toStrictEqual(
      'M 25.000 -33.333'
    );
    expect(VSegment.fromClose().toSvgString(dpu, 0)).toStrictEqual('Z');
    expect(
      VSegment.fromCubicBezier(ptE, ptC, ptD).toSvgString(dpu, 0)
    ).toStrictEqual('C 14.286 11.111 -7.692 4.348 5.882 -80.000');
    expect(
      VSegment.fromSmoothBezier(ptE, ptC).toSvgString(dpu, 0)
    ).toStrictEqual('S 14.286 11.111 5.882 -80.000');
    expect(
      VSegment.fromQuadraticBezier(ptE, ptC).toSvgString(dpu, 0)
    ).toStrictEqual('Q 14.286 11.111 5.882 -80.000');
  });
  it('should rotate', () => {
    const r90 = new Fraction('1/4');
    expect(VSegment.fromClose().rotate(r90)).toStrictEqual(
      VSegment.fromClose()
    );
    expect(
      VSegment.fromLineTo(ptA).rotate(r90).toDalmatianString()
    ).toStrictEqual('L -1/3 1/4');
    expect(
      VSegment.fromCubicBezier(ptE, ptC, ptD).rotate(r90).toDalmatianString()
    ).toStrictEqual('C 1/9 1/7 1/23 -1/13 -4/5 1/17');
  });
  it('should translate', () => {
    expect(VSegment.fromClose().translate(ptE)).toStrictEqual(
      VSegment.fromClose()
    );
    expect(
      VSegment.fromLineTo(ptA).translate(ptB).toDalmatianString()
    ).toStrictEqual('L 9/20 1/2');
    expect(
      VSegment.fromCubicBezier(ptE, ptC, ptD).translate(ptB).toDalmatianString()
    ).toStrictEqual('C 12/35 1/18 8/65 17/138 22/85 29/30');
  });
  it('should scale', () => {
    const double = new Fraction('2/1');
    const half = new Fraction('1/2');
    expect(VSegment.fromClose().scale(double)).toStrictEqual(
      VSegment.fromClose()
    );
    expect(
      VSegment.fromLineTo(ptA).scale(double).toDalmatianString()
    ).toStrictEqual('L 1/2 2/3');
    expect(
      VSegment.fromCubicBezier(ptE, ptC, ptD).scale(half).toDalmatianString()
    ).toStrictEqual('C 1/14 -1/18 -1/26 -1/46 1/34 2/5');
  });
});
