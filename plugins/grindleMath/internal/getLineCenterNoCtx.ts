import type { KAPLAYCtx, Line, Vec2 } from "kaplay"

export function getLineCenterNoCtx(k: KAPLAYCtx) {
    return function getLineCenter(line: Line): Vec2 {
        return k.vec2((line.p1.x + line.p2.x) / 2, (line.p1.y + line.p2.y) / 2)
    }
}
