import type { KAPLAYCtx, Vec2 } from "kaplay"

export function calcAvgVelocityNoCtx(k: KAPLAYCtx) {
    return function calcAvgVelocity(positions: Vec2[]): Vec2 {
        if (positions.length < 2) return k.vec2()
        const totalVelocity = { x: 0, y: 0 }
        for (let i = 1; i < positions.length; i++) {
            const currentPos = positions[i]
            const prevPos = positions[i - 1]
            totalVelocity.x += currentPos.x - prevPos.x
            totalVelocity.y += currentPos.y - prevPos.y
        }
        const numSamples = positions.length - 1
        return k.vec2(
            totalVelocity.x / numSamples,
            totalVelocity.y / numSamples,
        )
    }
}
