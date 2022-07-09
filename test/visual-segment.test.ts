import { V2d } from '../src/vector-2d';
import { V2dList } from '../src/vector-2d-list';
import { VSegment } from '../src/visual-segment';

const ptA = V2d.fromString('1/4 1/3');
// const ptB = V2d.fromString('1/5 1/6');
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
});
