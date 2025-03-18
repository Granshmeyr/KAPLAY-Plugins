import type { Circle, KAPLAYCtx, Polygon, Rect } from "kaplay"
import type { Tiled } from "./types"
import { objUtil } from "./objUtil.ts"

export function getObjShapeNoCtx(k: KAPLAYCtx) {
    return function getObjShape(opt: GetObjShapeOpt): Rect | Circle | Polygon {
        const { obj, pixelScale } = opt
        if (objUtil.isPolygon(obj))
            return new k.Polygon(
                obj.polygon.map(({ x, y }) => k.vec2(x, y).scale(pixelScale)),
            )
        if (objUtil.isEllipse(obj))
            return new k.Circle(k.vec2(), (obj.width / 2) * pixelScale)
        return new k.Rect(
            k.vec2(),
            obj.width * pixelScale,
            obj.height * pixelScale,
        )
    }
}

type GetObjShapeOpt = {
    obj: Tiled.AreaObj
    pixelScale: number
}
