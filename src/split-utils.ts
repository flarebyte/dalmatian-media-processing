const isString = (value: unknown): value is string => typeof value === 'string';

/* Based on [type-fest](https://github.com/sindresorhus/type-fest/) 
 from [sindresorhus](https://github.com/sindresorhus)
*/

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';

type FixedLengthArray<
  Element,
  Length extends number,
  ArrayPrototype = [Element, ...Element[]]
> = Pick<
  ArrayPrototype,
  Exclude<keyof ArrayPrototype, ArrayLengthMutationKeys>
> & {
  [index: number]: Element;
  [Symbol.iterator]: () => IterableIterator<Element>;
  readonly length: Length;
};

export function splitString<L extends number>(
  line: string,
  separator: string,
  fields: FixedLengthArray<string, L>
): FixedLengthArray<string, L> {
  const stringArray = line.split(separator).filter(isString);
  for (const [index, field] of fields.entries()) {
    if (typeof stringArray.at(index) === undefined) {
      throw new Error(`Field ${field} is expected in ${line}`);
    }
  }
  const results =  fields.map((_field, index) => stringArray.at(index) || '');
}
