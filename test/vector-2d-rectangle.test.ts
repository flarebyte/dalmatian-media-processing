import { V2dRect } from '../src/vector-2d-rectangle';
import { V2d } from '../src/vector-2d';

const pointA = V2d.fromString('1/4 1/5');
const pointB = V2d.fromString('1/2 2/5');

describe('vector-2d-rectangle', () => {
  it('should provide fromOppositePoints', () => {
    const actual = V2dRect.fromOppositePoints(pointA, pointB);
    expect(actual.toString()).toStrictEqual('xy 1/4 1/5 width 0.25 height 0.2');
  });
});
