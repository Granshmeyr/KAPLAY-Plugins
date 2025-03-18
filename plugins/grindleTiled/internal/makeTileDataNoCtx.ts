import type { KAPLAYCtx, SpriteData, Vec2 } from "kaplay"
import type { GrindleTiled } from "./types"
import { layerUtil } from "./layerUtil.ts"
import { objUtil } from "./objUtil.ts"
import { hasTags } from "./hasTags.ts"
import { TILED_TAG } from "./TILED_TAG.ts"
import type { getObjPosNoCtx } from "./getObjPosNoCtx.ts"
import type { Tiled } from "./types"

export function makeTileDataNoCtx(
    k: KAPLAYCtx,
    getObjPos: ReturnType<typeof getObjPosNoCtx>,
) {
    return function makeTileData(
        opt: MakeTileDataOpt,
    ): GrindleTiled.TileData[] {
        const { tmj, fileName, tileSprData, spriteScale, pixelScale, origin } =
            opt
        return tmj.layers
            .filter((l) => layerUtil.isObjectLayer(l))
            .filter((l) => !hasTags(l.name, ["collision", "rasterize"], "or"))
            .flatMap((l) => l.objects)
            .sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x))
            .flatMap((o) => {
                if (!objUtil.isTile(o)) return []
                const spriteId: string = `${fileName}_tile${o.gid}`
                const spriteData = tileSprData[spriteId]
                return [
                    {
                        name: o.name,
                        props: o.properties,
                        obj: k.make([
                            TILED_TAG,
                            k.pos(getObjPos({ obj: o, origin, pixelScale })),
                            k.sprite(spriteId, {
                                width: spriteData.width * spriteScale,
                                height: spriteData.height * spriteScale,
                            }),
                        ]),
                    },
                ]
            })
    }
}

type MakeTileDataOpt = {
    tmj: Tiled.Tmj
    fileName: string
    tileSprData: Record<string, SpriteData>
    spriteScale: number
    pixelScale: number
    origin: Vec2
}
