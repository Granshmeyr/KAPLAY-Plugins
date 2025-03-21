import type { KAPLAYCtx, Vec2 } from "kaplay"
import type { GrindleSvgMove } from "./types.d.ts"
import { PathController } from "./PathController.ts"

export function makePathControllerNoCtx(k: KAPLAYCtx) {
    return function makePathController(
        factory: GrindleSvgMove.PathFactory,
        from: Vec2,
        to: Vec2,
    ): PathController {
        return new PathController(k, factory(from, to))
    }
}
