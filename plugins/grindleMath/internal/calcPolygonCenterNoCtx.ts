import type { KAPLAYCtx, Vec2 } from "kaplay"

export function calcPolygonCenterNoCtx(k: KAPLAYCtx) {
    return function calcPolygonCenter(pts: Vec2[]): Vec2 {
        if (pts.length === 0) return k.vec2()

        const sum = pts.reduce<{ x: number; y: number }>(
            (acc, point) => ({
                x: acc.x + point.x,
                y: acc.y + point.y,
            }),
            { x: 0, y: 0 },
        )
        const centerX = sum.x / pts.length
        const centerY = sum.y / pts.length

        return k.vec2(centerX, centerY)
    }
}
