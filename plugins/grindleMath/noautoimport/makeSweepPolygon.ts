import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { GrindleMath } from "./types.d.ts"

export function makeSweepPolygon(k: KAPLAYCtx) {
    return function sweepPolygon(
        options: GrindleMath.SweepPolygonOpt,
    ): GrindleMath.SweepHit[] {
        const {
            pts,
            target,
            spacing = 4,
            velPerSec,
            anglePerSec,
            distThreshold = 150,
            targetLeniency = 0.8,
            exclude,
        } = options

        const results: GrindleMath.SweepHit[] = []
        const anglePerSecRad = (anglePerSec * Math.PI) / 180
        const distThresholdSq = distThreshold * distThreshold
        const cosTL = Math.cos(targetLeniency)
        const cosTLSq = cosTL * cosTL

        // Pre-calculate center point
        let centerX = 0
        let centerY = 0
        const vertLength = pts.length
        for (let i = 0; i < vertLength; i++) {
            centerX += pts[i].x
            centerY += pts[i].y
        }
        centerX /= vertLength
        centerY /= vertLength
        const center = k.vec2(centerX, centerY)

        // Optimized helper functions
        const getEdgeNormal = (start: Vec2, end: Vec2): Vec2 => {
            const normalX = end.y - start.y
            const normalY = start.x - end.x
            const length = Math.sqrt(normalX * normalX + normalY * normalY)
            return k.vec2(normalX / length, normalY / length)
        }

        const isEdgeFacingPoint = (start: Vec2, end: Vec2): boolean => {
            const midX = (start.x + end.x) / 2
            const midY = (start.y + end.y) / 2
            const toPointX = target.x - midX
            const toPointY = target.y - midY
            const normal = getEdgeNormal(start, end)
            return normal.x * toPointX + normal.y * toPointY > 0
        }

        // Helper function to check if a raycast might hit the target
        const mightHitTarget = (point: Vec2, velocity: Vec2): boolean => {
            const toTargetX = target.x - point.x
            const toTargetY = target.y - point.y
            const dot = velocity.x * toTargetX + velocity.y * toTargetY
            const len2_v = velocity.x * velocity.x + velocity.y * velocity.y
            const len2_t = toTargetX * toTargetX + toTargetY * toTargetY
            return dot * dot > cosTLSq * len2_v * len2_t
        }

        // Process each edge of the polygon
        for (let i = 0; i < vertLength; i++) {
            const start = pts[i]
            const end = pts[(i + 1) % vertLength]

            if (isEdgeFacingPoint(start, end)) {
                // Calculate edge length and number of points
                const dx = end.x - start.x
                const dy = end.y - start.y
                const edgeLength = Math.sqrt(dx * dx + dy * dy)
                const numPoints = Math.floor(edgeLength / spacing)

                if (k.debug.inspect) {
                    k.drawLine({
                        p1: start,
                        p2: end,
                        width: 3,
                        color: k.RED,
                    })
                }

                // Generate points along edge
                for (let j = 0; j <= numPoints; j++) {
                    const t = j / numPoints
                    const pointX = start.x + dx * t
                    const pointY = start.y + dy * t

                    // Check distance to target
                    const distX = target.x - pointX
                    const distY = target.y - pointY
                    if (distX * distX + distY * distY <= distThresholdSq) {
                        // Calculate rotational velocity
                        const relX = pointX - center.x
                        const relY = pointY - center.y
                        const rotVelX = -anglePerSecRad * relY
                        const rotVelY = anglePerSecRad * relX

                        // Calculate total velocity
                        const pointVelocity = k.vec2(
                            velPerSec.x + rotVelX,
                            velPerSec.y + rotVelY,
                        )

                        // Only perform raycast if it might hit target
                        const point = k.vec2(pointX, pointY)
                        if (mightHitTarget(point, pointVelocity)) {
                            const result = k.raycast(
                                point,
                                pointVelocity,
                                exclude,
                            )
                            if (result) {
                                results.push({
                                    hit: result,
                                    pointVel: pointVelocity,
                                    edge: i,
                                })

                                if (k.debug.inspect) {
                                    k.drawLine({
                                        p1: point,
                                        p2: result.point,
                                        width: 1,
                                        color: k.GREEN,
                                    })
                                }
                            } else if (k.debug.inspect) {
                                const rayEndPoint = k.vec2(
                                    point.x + pointVelocity.x,
                                    point.y + pointVelocity.y,
                                )
                                k.drawLine({
                                    p1: point,
                                    p2: rayEndPoint,
                                    width: 1,
                                    color: k.RED,
                                })
                            }
                        }
                    }
                }
            }
        }

        return results
    }
}
