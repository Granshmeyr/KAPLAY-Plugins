import type { GrindleUtil } from "./types"

export function makeStringEnum<T extends string>(
    keys: T[],
): GrindleUtil.Enum<T> {
    const result = {} as { [K in T]: K }
    for (const key of keys) {
        result[key] = key
    }
    return result
}
