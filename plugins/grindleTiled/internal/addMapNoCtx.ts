import type { GameObj, KAPLAYCtx } from "kaplay"
import type { GrindleTiled, MapOpt } from "./types"
import type { makeMapNoCtx } from "./makeMapNoCtx"

export function addMapNoCtx(
    k: KAPLAYCtx,
    makeMap: ReturnType<typeof makeMapNoCtx>,
) {
    return async function addMap(opt: MapOpt): Promise<{
        objs: GameObj[]
        layerData: GrindleTiled.LayerData[]
        tileData: GrindleTiled.TileData[]
        areaData: GrindleTiled.AreaData[]
        colData: GrindleTiled.CollisionData[]
        pointData: GrindleTiled.PointData[]
    }> {
        const data = await makeMap(opt)
        for (const o of data.objs) {
            k.add(o)
        }
        return data
    }
}
