import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { Tiled, GrindleTiled } from "./types"
import { layerUtil } from "./layerUtil.ts"
import { hasTags } from "./hasTags.ts"
import { objUtil } from "./objUtil.ts"
import { TILED_TAG } from "./TILED_TAG.ts"
import type { getObjPosNoCtx } from "./getObjPosNoCtx.ts"
import type { getObjShapeNoCtx } from "./getObjShapeNoCtx.ts"

export function makeCollisionDataNoCtx(
    k: KAPLAYCtx,
    getObjPos: ReturnType<typeof getObjPosNoCtx>,
    getObjShape: ReturnType<typeof getObjShapeNoCtx>,
) {
    return function makeCollisionData(
        opt: MakeCollisionDataOpt,
    ): GrindleTiled.CollisionData[] {
        const { tmj, pixelScale, origin } = opt
        return tmj.layers
            .filter((l) => layerUtil.isObjectLayer(l))
            .filter((l) => hasTags(l.name, ["collision"]))
            .flatMap((l) => l.objects)
            .flatMap((o) => {
                if (objUtil.isPoint(o)) return []
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
                            k.body({ isStatic: true }),
                        ]),
                    },
                ]
            })
    }
}

type MakeCollisionDataOpt = {
    tmj: Tiled.Tmj
    origin: Vec2
    pixelScale: number
}
