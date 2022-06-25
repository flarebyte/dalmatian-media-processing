# Internal

> Overview of the code base of dalmatian-media-processing

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `fraction-math.ts`{
  - radians()
  +cosFract()
  +sinFract()
  +atanFract()
}
class `index.ts`
class `vector-2d-rectangle.ts`
class `vector-2d.ts`
class `fraction.js`{
  +Fraction()
}
class `./vector-2d`{
  +V2d()
}
class `./fraction-math`{
  +sinFract()
  +cosFract()
  +atanFract()
}
`fraction-math.ts`-->`fraction.js`
`vector-2d-rectangle.ts`-->`fraction.js`
`vector-2d-rectangle.ts`-->`./vector-2d`
`vector-2d.ts`-->`fraction.js`
`vector-2d.ts`-->`./fraction-math`
```
