import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { PathArray } from "svg-path-commander"
import type { GrindleSvgMove } from "./types"
import { default as SVGPathCommander } from "svg-path-commander"

export function makePathFactoryNoCtx(k: KAPLAYCtx) {
    return function makePathFactory(
        svgPath: string,
        canvasRes: Vec2 = k.vec2(250, 250),
        gameRes: Vec2 = k.vec2(1920, 1080),
    ): GrindleSvgMove.PathFactory {
        const halfWidth = canvasRes.x / 2
        const topGuidelineOffset = canvasRes.y * (2 / 5)
        const origPath = SVGPathCommander.parsePathString(svgPath)
        const betweenGuidelinesScale = canvasRes.y / 5
        return (from: Vec2, to: Vec2): PathArray => {
            return SVGPathCommander.transformPath(origPath, {
                translate: [-halfWidth + from.x, -topGuidelineOffset + from.y],
                origin: [halfWidth, topGuidelineOffset],
                rotate: angleBetween(from, to) - 90,
                scale: [
                    gameRes.x / canvasRes.x,
                    from.dist(to) / betweenGuidelinesScale,
                ],
            })
        }
    }
}

function angleBetween(from: Vec2, to: Vec2): number {
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    const radians = Math.atan2(deltaY, deltaX)
    const degrees = radians * (180 / Math.PI)
    return (degrees + 360) % 360
}
