import type { KAPLAYCtx } from "kaplay"
import type { GrindleDebug } from "./types"

export function drawPolygonEdgesNoCtx(k: KAPLAYCtx) {
    return function drawPolygonEdges(
        opt: GrindleDebug.DrawPolygonEdgesOpt,
    ): void {
        const { pts, edgeIndices, color = k.CYAN, lineWidth = 6 } = opt
        if (pts.length < 3)
            throw new Error("Polygon must have at least 3 vertices")

        const totalEdges = pts.length
        const validEdgeIndices = edgeIndices
            .filter((index) => index >= 0 && index < totalEdges)
            .sort((a, b) => a - b)

        for (const edgeIndex of validEdgeIndices) {
            const startVertex = pts[edgeIndex]
            const endVertex = pts[(edgeIndex + 1) % pts.length]
            k.drawLine({
                p1: startVertex,
                p2: endVertex,
                width: lineWidth,
                color: color,
            })
        }
    }
}
