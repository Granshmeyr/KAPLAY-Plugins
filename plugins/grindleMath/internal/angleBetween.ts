import type { Vec2 } from "kaplay"

export function angleBetween(from: Vec2, to: Vec2): number {
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    const radians = Math.atan2(deltaY, deltaX)
    const degrees = radians * (180 / Math.PI)
    return (degrees + 360) % 360
}
