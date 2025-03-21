import type { GrindleUtil } from "../../grindleUtil/index.ts"

export function makeSpriteAnimFactory<N extends GrindleUtil.Enum<string>>() {
    return <
        T extends string,
        A extends { [K in keyof Partial<N>]: GrindleUtil.Enum<T> } & Record<
            Exclude<keyof A, keyof N>,
            never
        >,
    >(
        spriteAnim: A,
    ): A => spriteAnim
}
