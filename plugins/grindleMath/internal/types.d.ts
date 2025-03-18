/* eslint-disable filename-export/match-named-export */
import type { RaycastHit, Vec2, Tag } from "kaplay"

export namespace GrindleMath {
    export type SweepHit = {
        hit: RaycastHit
        pointVel: Vec2
        edge: number
    }
    export type SweepPolygonOpt = {
        pts: Vec2[]
        target: Vec2
        spacing?: number
        velPerSec: Vec2
        anglePerSec: number
        distThreshold?: number
        targetLeniency?: number
        exclude?: Tag[]
    }
}
