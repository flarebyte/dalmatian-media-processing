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
});
