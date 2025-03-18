import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { Tiled } from "./types"
import { objUtil } from "./objUtil.ts"

export function getObjPosNoCtx(k: KAPLAYCtx) {
    return function getObjPos(opt: GetObjPosOpt): Vec2 {
        const { obj, pixelScale, origin } = opt
        const o = origin
        return objUtil.isEllipse(obj)
            ? k
                .vec2(
                    o.x + obj.x + obj.width / 2,
                    o.y + obj.y + obj.width / 2,
                )
                .scale(pixelScale)
            : k.vec2(o.x + obj.x, o.y + obj.y).scale(pixelScale)
    }
}

type GetObjPosOpt = {
    obj: Tiled.Obj
    pixelScale: number
    origin: Vec2
}
