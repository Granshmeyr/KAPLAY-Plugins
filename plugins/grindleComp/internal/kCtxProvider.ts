import type { PluggedK } from "./types"
import { idNoCtx } from "./idNoCtx.ts"
import { makeHasSuper } from "./makeHasSuper.ts"
import { makeCompFactory } from "./makeCompFactory.ts"

export function kCtxProvider(k: PluggedK) {
    return {
        id: idNoCtx(k),
        makeHasSuper,
        makeCompFactory
    } as const
}
