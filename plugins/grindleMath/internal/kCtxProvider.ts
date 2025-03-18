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

export function kCtxProvider(k: KAPLAYCtx) {
    return {
        angleBetween,
        calcAvgVelocity: calcAvgVelocityNoCtx(k),
        calcPolygonCenter: calcPolygonCenterNoCtx(k),
        makePolygonLines: makePolygonLinesNoCtx(k),
        makeRegularPolygonPts: makeRegularPolygonPtsNoCtx(k),
        digitalToAnalog: digitalToAnalogNoCtx(k),
        getAngleTo,
        getLineCenter: getLineCenterNoCtx(k),
        rotatePoint: rotatePointNoCtx(k),
        sweepPolygon: makeSweepPolygon(k),
    } as const
}
