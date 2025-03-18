import type { KAPLAYCtx } from "kaplay"
import { drawPolygonEdgesNoCtx } from "./drawPolygonEdgesNoCtx.ts"
import { makeSnowForeverNoCtx } from "./makeSnowForeverNoCtx.ts"

export function kCtxProvider(k: KAPLAYCtx) {
    return {
        drawPolygonEdges: drawPolygonEdgesNoCtx(k),
        makeSnowForever: makeSnowForeverNoCtx(k),
    } as const
}
