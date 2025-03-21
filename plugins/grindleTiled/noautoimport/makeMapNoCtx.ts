import type { GameObj, KAPLAYCtx, SpriteData } from "kaplay"
import { extractPath } from "./extractPath.ts"
import { extractFileName } from "./extractFileName.ts"
import type { MapOpt, GrindleTiled, Tiled } from "./types.d.ts"
import type { makeLayerDataNoCtx } from "./makeLayerDataNoCtx.ts"
import type { makeTileDataNoCtx } from "./makeTileDataNoCtx.ts"
import type { makeAreaDataNoCtx } from "./makeAreaDataNoCtx.ts"
import type { makeCollisionDataNoCtx } from "./makeCollisionDataNoCtx.ts"
import type { getPointDataNoCtx } from "./getPointDataNoCtx.ts"

export function makeMapNoCtx(
    k: KAPLAYCtx,
    makeLayerData: ReturnType<typeof makeLayerDataNoCtx>,
    makeTileData: ReturnType<typeof makeTileDataNoCtx>,
    makeAreaData: ReturnType<typeof makeAreaDataNoCtx>,
    makeCollisionData: ReturnType<typeof makeCollisionDataNoCtx>,
    getPointData: ReturnType<typeof getPointDataNoCtx>,
) {
    const OUT_FILE_NAME = "index"
    return async function makeMap(opt: MapOpt): Promise<{
        objs: GameObj[]
        layerData: GrindleTiled.LayerData[]
        tileData: GrindleTiled.TileData[]
        areaData: GrindleTiled.AreaData[]
        colData: GrindleTiled.CollisionData[]
        pointData: GrindleTiled.PointData[]
    }> {
        const origin = opt.origin ?? k.vec2(0)
        const folder = extractPath(opt.file)
        const fileName = extractFileName(opt.file)
        const outJsonFile = `${folder}/.${fileName}/${OUT_FILE_NAME}.json`
        const outJson: Tiled.OutJson = await k
            .loadJSON(undefined, outJsonFile)
            .catch(() => {
                throw new Error(`Error loading ${outJsonFile}`)
            })

        const tmj: Tiled.Tmj = await k
            .loadJSON(undefined, opt.file)
            .catch(() => {
                throw new Error(`Error loading ${opt.file}`)
            })
        const layerSprData: Record<string, SpriteData> =
            await outJson.layers.reduce(async (accPromise, l) => {
                const acc = await accPromise
                const id = `${fileName}_layer${l.id}`
                const data = await k.loadSprite(
                    id,
                    `${folder}/.${fileName}/layer${l.id}${l.ext}`,
                )
                acc[id] = data
                return acc
            }, Promise.resolve({} as Record<string, SpriteData>))
        const tileSprData: Record<string, SpriteData> =
            await outJson.tiles.reduce(async (accPromise, t) => {
                const acc = await accPromise
                const id = `${fileName}_tile${t.gid}`
                const data = await k.loadSprite(
                    id,
                    `${folder}/.${fileName}/tile${t.gid}${t.ext}`,
                )
                acc[id] = data
                return acc
            }, Promise.resolve({} as Record<string, SpriteData>))
        const pixelScale =
            opt.pixelScale ??
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (k as any)?.gameConst?.PIXEL_SCALE ??
            1
        const spriteScale =
            opt.spriteScale ??
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (k as any)?.gameConst?.SPRITE_SCALE ??
            5
        const layerData = makeLayerData({
            tmj,
            fileName,
            origin,
            layerSprData,
            spriteScale,
        })
        const tileData = makeTileData({
            tmj,
            fileName,
            tileSprData,
            spriteScale,
            pixelScale,
            origin,
        })
        const areaData = makeAreaData({
            tmj,
            pixelScale,
            origin,
        })
        const colData = !opt.disableCol
            ? makeCollisionData({
                  tmj,
                  pixelScale,
                  origin,
              })
            : undefined
        const pointData = getPointData({ tmj, pixelScale, origin })
        const objs = [
            ...layerData,
            ...tileData,
            ...areaData,
            ...(!opt.disableCol ? colData : []),
        ].flatMap((v) => v.obj)

        return {
            objs,
            layerData,
            tileData,
            areaData,
            colData,
            pointData,
        }
    }
}
