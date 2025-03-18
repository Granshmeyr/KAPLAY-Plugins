/* eslint-disable filename-export/match-named-export */

import type { grindleUtil } from ".."

export namespace GrindleUtil {
    export type Enum<T extends string | number> = Readonly<{
        [K in T]: K
    }>

    export type Mutable<T> = {
        -readonly [K in keyof T]: T[K]
    }

    export type PromisifyRecord<T> = {
        [K in keyof T]: Promise<T[K]>
    }

    const __historyArray: ReturnType<
        typeof grindleUtil
    >["grindleUtil"]["HistoryArray"]
    export type HistoryArray<T> = InstanceType<typeof __historyArray<T>>
}
