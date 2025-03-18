import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { GrindleTiled } from "./types"
import { layerUtil } from "./layerUtil.ts"
import { objUtil } from "./objUtil.ts"
import { hasTags } from "./hasTags.ts"
import type { Tiled } from "./types"
import { TILED_TAG } from "./TILED_TAG.ts"
import type { getObjPosNoCtx } from "./getObjPosNoCtx.ts"
import type { getObjShapeNoCtx } from "./getObjShapeNoCtx.ts"

export function makeAreaDataNoCtx(
    k: KAPLAYCtx,
    getObjPos: ReturnType<typeof getObjPosNoCtx>,
    getObjShape: ReturnType<typeof getObjShapeNoCtx>,
) {
    return function makeAreaData(
        opt: MakeAreaDataOpt,
    ): GrindleTiled.AreaData[] {
        const { tmj, origin, pixelScale } = opt
        return tmj.layers
            .filter((l) => layerUtil.isObjectLayer(l))
            .filter((l) => !hasTags(l.name, ["collision", "rasterize"], "or"))
            .flatMap((l) => l.objects)
            .filter((o) => !objUtil.isPoint(o) && !objUtil.isTile(o))
            .flatMap((o) => {
                return [
                    {
                        name: o.name,
                        props: o.properties,
                        obj: k.make([
                            TILED_TAG,
                            k.pos(getObjPos({ obj: o, origin, pixelScale })),
                            k.area({
                                shape: getObjShape({ obj: o, pixelScale }),
                                collisionIgnore: [TILED_TAG],
                            }),
                        ]),
                    },
                ]
            })
    }
}

type MakeAreaDataOpt = {
    origin: Vec2
    tmj: Tiled.Tmj
    pixelScale: number
}
