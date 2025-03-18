import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { GrindleTiled } from "./types"
import { layerUtil } from "./layerUtil.ts"
import { objUtil } from "./objUtil.ts"
import type { Tiled } from "./types"

export function getPointDataNoCtx(k: KAPLAYCtx) {
    return function getPointData(
        opt: GetPointDataOpt,
    ): GrindleTiled.PointData[] {
        const { tmj, origin, pixelScale } = opt
        return tmj.layers
            .filter((l) => layerUtil.isObjectLayer(l))
            .flatMap((l) => l.objects)
            .filter((o) => objUtil.isPoint(o))
            .map((p) => {
                return {
                    name: p.name,
                    pos: origin.add(k.vec2(p.x, p.y).scale(pixelScale)),
                    props: p.properties,
                }
            })
    }
}

type GetPointDataOpt = {
    tmj: Tiled.Tmj
    origin: Vec2
    pixelScale: number
}
