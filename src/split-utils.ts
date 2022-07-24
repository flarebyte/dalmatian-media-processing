export const isString = (value: unknown): value is string =>
  typeof value === 'string';

interface FixedLengthStringArray<L extends number> extends Array<string> {
  0: string;
  1: string;
  length: L;
}

function splitStringNotAssert<L extends number>(
  line: string,
  separator: string,
  fields: FixedLengthStringArray<L>
): string[] {
  const stringArray = line.split(separator).filter(isString);
  for (const [index, field] of fields.entries()) {
    if (typeof stringArray.at(index) === undefined) {
      throw new Error(`Field ${field} is expected in ${line}`);
    }
  }
  return fields.map((_field, index) => stringArray.at(index) || '');
}

export function split2Strings(
  line: string,
  separator: string,
  fields: FixedLengthStringArray<2>
): FixedLengthStringArray<2> {
  const items = splitStringNotAssert<2>(line, separator, fields);
  return [items.at(0) || '', items.at(1) || ''];
}
