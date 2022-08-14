export const isString = (value: unknown): value is string =>
  typeof value === 'string';

const replaceBrackets = (line: string): string => line.replace(/[\[\]]/g, '');

export function splitStringAsMap<K>(
  line: string,
  separator: string,
  fields: readonly K[]
): Map<K, string> {
  const stringArray = line.split(separator, fields.length).filter(isString);
  const result = new Map<K, string>();

  for (const [index, field] of fields.entries()) {
    const value = stringArray.at(index);
    if (value === undefined) {
      throw new Error(`Field ${field} is expected in ${line}`);
    }
    result.set(field, value);
  }
  return result;
}

const leftAndRight = ['left', 'right'] as const;
type LeftAndRightTuple = typeof leftAndRight;
type LeftAndRight = LeftAndRightTuple[number];

export const splitStringAsLeftAndRight = (
  line: string,
  separator: string = '->'
) => splitStringAsMap<LeftAndRight>(line, separator, leftAndRight);

const trimStringArray = (rawLines: string, separator: string = ','): string[] =>
  rawLines
    .split(separator)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

export const parseDlmtArray = (line: string): string[] =>
  trimStringArray(replaceBrackets(line));
