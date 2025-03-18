import type { KAPLAYCtx, SpriteData, Vec2 } from "kaplay"
import type { GrindleTiled } from "./types"
import type { Tiled } from "./types"
import { TILED_TAG } from "./TILED_TAG.ts"
import { layerUtil } from "./layerUtil.ts"
import { hasTags } from "./hasTags.ts"

export function makeLayerDataNoCtx(k: KAPLAYCtx) {
    return function makeLayerData(
        opt: MakeLayerDataOpt,
    ): GrindleTiled.LayerData[] {
        const { tmj, fileName, layerSprData, spriteScale, origin } = opt
        return tmj.layers
            .filter(
                (l) =>
                    layerUtil.isTileLayer(l) || hasTags(l.name, ["rasterize"]),
            )
            .map((l, i) => {
                const spriteId = `${fileName}_layer${i}`
                const spriteData = layerSprData[spriteId]
                const obj = k.make([
                    TILED_TAG,
                    k.pos(origin),
                    k.sprite(spriteId, {
                        width: spriteData.width * spriteScale,
                        height: spriteData.height * spriteScale,
                    }),
                ])
                return { name: l.name, props: l.properties, obj }
            })
    }

    type MakeLayerDataOpt = {
        origin: Vec2
        tmj: Tiled.Tmj
        fileName: string
        layerSprData: Record<string, SpriteData>
        spriteScale: number
    }
}
