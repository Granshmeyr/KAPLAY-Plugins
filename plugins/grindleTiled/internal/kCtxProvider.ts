import type { KAPLAYCtx } from "kaplay"
import { makeMapNoCtx } from "./makeMapNoCtx.ts"
import { makeLayerDataNoCtx } from "./makeLayerDataNoCtx.ts"
import { makeTileDataNoCtx } from "./makeTileDataNoCtx.ts"
import { getObjPosNoCtx } from "./getObjPosNoCtx.ts"
import { makeAreaDataNoCtx } from "./makeAreaDataNoCtx.ts"
import { getObjShapeNoCtx } from "./getObjShapeNoCtx.ts"
import { getPointDataNoCtx } from "./getPointDataNoCtx.ts"
import { addMapNoCtx } from "./addMapNoCtx.ts"
import { makeCollisionDataNoCtx } from "./makeCollisionDataNoCtx.ts"

export function kCtxProvider(k: KAPLAYCtx) {
    const getObjPos = getObjPosNoCtx(k)
    const getObjShape = getObjShapeNoCtx(k)
    const getPointData = getPointDataNoCtx(k)

    const makeLayerData = makeLayerDataNoCtx(k)
    const makeTileData = makeTileDataNoCtx(k, getObjPos)
    const makeAreaData = makeAreaDataNoCtx(k, getObjPos, getObjShape)
    const makeCollisionData = makeCollisionDataNoCtx(k, getObjPos, getObjShape)

    const makeMap = makeMapNoCtx(
        k,
        makeLayerData,
        makeTileData,
        makeAreaData,
        makeCollisionData,
        getPointData,
    )
    const addMap = addMapNoCtx(k, makeMap)

    return {
        addMap,
        makeMap
    } as const
}
