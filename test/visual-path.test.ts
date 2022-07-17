import { VPath } from '../src/visual-path';

describe('visual-path', () => {
  it('should provide fromDalmatianString', () => {
    const dPath =
      '[ M -1/7 -1/9,L 1/7 -1/9,Q 1/4 1/115 1/2 2/115,T 1/4 1/111,C 1/4 1/117 1/2 2/117 3/4 1/39,S 1/4 1/113 1/2 2/113,Z ]';
    expect(VPath.fromDalmatianString(dPath).toDalmatianString()).toStrictEqual(
      dPath
    );
  });
  it('should provide toCoreCartesianString', () => {
    const vpath = VPath.fromDalmatianString(
      '[ M -1/7 -1/9,L 1/7 -1/9,Q 1/4 1/115 1/2 2/115,T 1/4 1/111,C 1/4 1/117 1/2 2/117 3/4 1/39,S 1/4 1/113 1/2 2/113,Z ]'
    );
    expect(vpath.toCoreCartesianString(100, ';')).toStrictEqual(
      '(-14.286,-11.111);(14.286,-11.111);(50.000,1.739);(25.000,0.901);(75.000,2.564);(50.000,1.770)'
    );
    expect(
      vpath.toCoreCartesianString(100, ';').split(';').length
    ).toStrictEqual(vpath.size() - 1);
  });
  it('should provide toCoreSvgString', () => {
    const vpath = VPath.fromDalmatianString(
      '[ M -1/7 -1/9,L 1/7 -1/9,Q 1/4 1/115 1/2 2/115,T 1/4 1/111,C 1/4 1/117 1/2 2/117 3/4 1/39,S 1/4 1/113 1/2 2/113,Z ]'
    );
    expect(vpath.toCoreSvgString(100, 0)).toStrictEqual(
      'M -14.286 11.111 L 14.286 11.111 L 50.000 -1.739 L 25.000 -0.901 L 75.000 -2.564 L 50.000 -1.770 Z'
    );
  });
  it('should provide toSvgString', () => {
    const vpath = VPath.fromDalmatianString(
      '[ M -1/7 -1/9,L 1/7 -1/9,Q 1/4 1/115 1/2 2/115,T 1/4 1/111,C 1/4 1/117 1/2 2/117 3/4 1/39,S 1/4 1/113 1/2 2/113,Z ]'
    );
    expect(vpath.toSvgString(100, 0)).toStrictEqual(
      'M -14.286 11.111 L 14.286 11.111 Q 25.000 -0.870 50.000 -1.739 T 25.000 -0.901 C 25.000 -0.855 50.000 -1.709 75.000 -2.564 S 25.000 -0.885 50.000 -1.770 Z'
    );
  });
  it('should provide toActionFrequency', () => {
    const vpath = VPath.fromDalmatianString(
      '[ M -1/7 -1/9,L 1/7 -1/9, L 1/7 -1/11, Q 1/4 1/115 1/2 2/115,T 1/4 1/111,C 1/4 1/117 1/2 2/117 3/4 1/39,S 1/4 1/113 1/2 2/113,Z ]'
    );
    expect(vpath.toActionFrequency()).toStrictEqual({
      M: 1,
      L: 2,
      Q: 1,
      T: 1,
      C: 1,
      S: 1,
      Z: 1,
      E: 0,
      Total: 8,
    });
  });
});
