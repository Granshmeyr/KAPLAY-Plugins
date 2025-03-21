/* eslint-disable filename-export/match-named-export */
import type { GameObj } from "kaplay"

export namespace GrindleBundle {
    export type BundleObj<
        TFactoryParam extends Record<string, (...args: unknown[]) => unknown>,
    > = GameObj<CompFromFactoryParam<TFactoryParam>>
}

type CompFromFactoryParam<
    TFactoryParam extends Record<string, (...args: unknown[]) => unknown>,
> = {
    [K in keyof TFactoryParam]: ReturnType<TFactoryParam[K]>
}[keyof TFactoryParam]
