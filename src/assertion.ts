export function assertMapValueEquals<K>(fields: Map<K, string>, key: K, expected: string, line: string){
    const actual = fields.get(key)
    if (actual !== expected) {
        throw new Error(`Expected field [${key}] to equal [${expected}] not [${actual}] in ${line}`)
    }
}