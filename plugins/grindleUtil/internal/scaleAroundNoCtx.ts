import type { GameObj, KAPLAYCtx, PosComp, ScaleComp, SpriteComp, Vec2 } from "kaplay"


export function scaleAroundNoCtx(k: KAPLAYCtx) {
    return function scaleAround(
        obj: GameObj<PosComp | SpriteComp | ScaleComp>,
        point: Vec2,
        scale: Vec2 | number
    ) {
        const parsedScale: Parameters<typeof scaleAround>[2] = (() => {
            if (typeof scale === "number") {
                if (scale === 0) return 0.000000001
                return scale
            }
            if (scale.x === 0 && scale.y === 0) return k.vec2(0.000000001)
            return scale
        })()
        const origScale = obj.scale
        const diff = obj.pos.sub(point)
        if (typeof parsedScale === "number") obj.scaleTo(parsedScale)
        else obj.scale = parsedScale
        const scaleRatio = obj.scale.invScale(origScale)
        const scaledDiff = k.vec2(diff.x * scaleRatio.x, diff.y * scaleRatio.y)
        obj.pos = point.add(scaledDiff)
    }
}
