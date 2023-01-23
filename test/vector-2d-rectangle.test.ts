import { V2dRect } from '../src/vector-2d-rectangle.js';
import { V2d } from '../src/vector-2d.js';

const pointA = V2d.fromString('1/4 1/5');
const pointB = V2d.fromString('1/2 2/5');

describe('vector-2d-rectangle', () => {
  it('should provide fromOppositePoints', () => {
    const actual = V2dRect.fromOppositePoints(pointA, pointB);
    expect(actual.toString()).toStrictEqual('xy 1/4 1/5 width 1/4 height 1/5');
  });
});
