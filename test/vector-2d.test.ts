import { V2d } from '../src/vector-2d';

describe('vector-2d', () => {
  it('should display the right representation', () => {
    const values = ['1/2 1/4', '-1/2 -1/3'];
    const actual = values.map(V2d.fromString).map((v) => ({
      dalmatian: v.toDalmatianString(),
      cartesian: v.toCartesianString(300),
    }));
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "cartesian": "(150.000,75.000)",
          "dalmatian": "0.5 0.25",
        },
        Object {
          "cartesian": "(-150.000,-100.000)",
          "dalmatian": "-0.5 -0.(3)",
        },
      ]
    `);
  });
});
