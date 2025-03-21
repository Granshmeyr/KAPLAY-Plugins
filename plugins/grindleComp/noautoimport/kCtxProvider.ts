import type { PluggedK } from "./types.d.ts"
import { idNoCtx } from "./idNoCtx.ts"
import { makeHasSuper } from "./makeHasSuper.ts"
import { makeCompFactory } from "./makeCompFactory.ts"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function kCtxProvider(_k: PluggedK) {
    return {
        id: idNoCtx(_k),
        makeHasSuper,
        makeCompFactory,
    } as const
}
