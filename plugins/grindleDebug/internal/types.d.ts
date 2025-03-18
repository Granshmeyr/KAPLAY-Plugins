/* eslint-disable filename-export/match-named-export */
import type { Vec2, Color } from "kaplay"

export namespace GrindleDebug {
    export type DrawPolygonEdgesOpt = {
        pts: Vec2[]
        edgeIndices: number[]
        color?: Color
        lineWidth?: number
    }
}
