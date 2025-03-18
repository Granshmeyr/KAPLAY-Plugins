import type { KAPLAYCtx, Vec2 } from "kaplay"

export function makeRegularPolygonPtsNoCtx(k: KAPLAYCtx) {
    return function makeRegularPolygonPts(
        options: MakeRegularPolygonPtsOpt,
    ): Vec2[] {
        const { sides, radius } = options
        if (sides < 3) throw new Error("Polygon must have at least 3 sides")
        const vertices: Vec2[] = []
        const angleStep = (Math.PI * 2) / sides
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep
            const vertex = k.vec2(
                radius * Math.cos(angle),
                radius * Math.sin(angle),
            )
            vertices.push(vertex)
        }
        return vertices
    }
}

type MakeRegularPolygonPtsOpt = {
    sides: number
    radius: number
}
