import { makePluginFactory } from "./makePluginFactory.ts"
import type { PluggedK } from "./types.d.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleSprite = makePluginFactory("grindleSprite")((_k) => {
    const pluggedK = _k as PluggedK
    for (const p of ["grindleUtil"] as const) {
        if (!pluggedK[p])
            throw new Error(
                `Unable to access plugin ${p} in KAPLAY context. Is your plugin load order correct?`,
            )
    }

    return kCtxProvider(pluggedK)
})
