import type { GrindleUtil } from "./types.d.ts"

export function objFromEnum<TEnum extends GrindleUtil.Enum<string> = never>() {
    return function makeObj<
        TObj extends TEnum extends GrindleUtil.Enum<string>
            ? Record<keyof TEnum, unknown>
            : never,
    >(obj: TObj): TObj {
        return obj
    }
}
