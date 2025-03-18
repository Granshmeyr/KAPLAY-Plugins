/* eslint-disable filename-export/match-named-export */
import type { Vec2 } from "kaplay"
import type { PathArray } from "svg-path-commander"
import type { grindleSvgMove } from "./grindleSvgMove"

export namespace GrindleSvgMove {
    export type PathFactory = (from: Vec2, to: Vec2) => PathArray
    export type PathController = ReturnType<
        ReturnType<
            typeof grindleSvgMove
        >["grindleSvgMove"]["makePathController"]
    >
}
