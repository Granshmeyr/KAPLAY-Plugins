import type { KAPLAYCtx } from "kaplay"

export function makePluginFactory<T extends string>(name: T) {
    return <D extends Record<string, unknown>>(def: (k: KAPLAYCtx) => D) => {
        return (k: KAPLAYCtx) =>
            ({
                [name]: def(k),
            }) as { [K in T]: D }
    }
}
