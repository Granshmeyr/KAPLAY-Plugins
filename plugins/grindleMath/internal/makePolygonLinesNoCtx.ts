import type { KAPLAYCtx, Line, Vec2 } from "kaplay"

export function makePolygonLinesNoCtx(k: KAPLAYCtx) {
    return function makePolygonLines(pts: Vec2[]): Line[] {
        if (pts.length < 2) return []
        const lines: Line[] = []
        for (let i = 0; i < pts.length - 1; i++) {
            lines.push(new k.Line(pts[i], pts[i + 1]))
        }
        lines.push(new k.Line(pts[pts.length - 1], pts[0]))
        return lines
    }
}
