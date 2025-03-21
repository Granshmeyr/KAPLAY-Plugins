import type { KAPLAYCtx } from "kaplay"
import { angleBetween } from "./angleBetween.ts"
import { calcAvgVelocityNoCtx } from "./calcAvgVelocityNoCtx.ts"
import { calcPolygonCenterNoCtx } from "./calcPolygonCenterNoCtx.ts"
import { makePolygonLinesNoCtx } from "./makePolygonLinesNoCtx.ts"
import { makeRegularPolygonPtsNoCtx } from "./makeRegularPolygonPtsNoCtx.ts"
import { digitalToAnalogNoCtx } from "./digitalToAnalogNoCtx.ts"
import { getAngleTo } from "./getAngleTo.ts"
import { getLineCenterNoCtx } from "./getLineCenterNoCtx.ts"
import { rotatePointNoCtx } from "./rotatePointNoCtx.ts"
import { makeSweepPolygon } from "./makeSweepPolygon.ts"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function kCtxProvider(_k: KAPLAYCtx) {
    return {
        angleBetween,
        calcAvgVelocity: calcAvgVelocityNoCtx(_k),
        calcPolygonCenter: calcPolygonCenterNoCtx(_k),
        makePolygonLines: makePolygonLinesNoCtx(_k),
        makeRegularPolygonPts: makeRegularPolygonPtsNoCtx(_k),
        digitalToAnalog: digitalToAnalogNoCtx(_k),
        getAngleTo,
        getLineCenter: getLineCenterNoCtx(_k),
        rotatePoint: rotatePointNoCtx(_k),
        sweepPolygon: makeSweepPolygon(_k),
    } as const
}
