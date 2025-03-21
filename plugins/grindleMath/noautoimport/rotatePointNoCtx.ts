import type { KAPLAYCtx, Vec2 } from "kaplay"

export function rotatePointNoCtx(k: KAPLAYCtx) {
    return function rotatePoint(point: Vec2, degrees: number): Vec2 {
        if (degrees == null) {
            console.error("Trying to rotate a point by null degrees.")
            return k.vec2()
        }
        const radians = k.deg2rad(degrees)
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        return k.vec2(
            point.x * cos - point.y * sin,
            point.x * sin + point.y * cos,
        )
    }
}
