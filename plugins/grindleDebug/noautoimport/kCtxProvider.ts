import type { KAPLAYCtx } from "kaplay"
import { drawPolygonEdgesNoCtx } from "./drawPolygonEdgesNoCtx.ts"
import { makeSnowForeverNoCtx } from "./makeSnowForeverNoCtx.ts"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function kCtxProvider(_k: KAPLAYCtx) {
    return {
        drawPolygonEdges: drawPolygonEdgesNoCtx(_k),
        makeSnowForever: makeSnowForeverNoCtx(_k),
    } as const
}
