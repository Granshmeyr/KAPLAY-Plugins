import type { KAPLAYCtx, EaseFunc, Vec2 } from "kaplay"
import type { PathArray } from "svg-path-commander"
import { default as SVGPathCommander } from "svg-path-commander"

export class PathController {
    private _progress = 0
    private path: PathArray
    private pathLen: number
    private k: KAPLAYCtx

    constructor(k: KAPLAYCtx, path: PathArray) {
        this.k = k
        this.path = path
        this.pathLen = SVGPathCommander.getTotalLength(path)
    }
    move(length: number, easeFunc: EaseFunc = this.k.easings.linear): Vec2 {
        const absLen = this.pathLen * this.progress + length
        const newLen = ((): number => {
            if (absLen <= 0) return 0
            if (absLen >= this.pathLen) return this.pathLen
            return absLen
        })()
        const percent = newLen / this.pathLen
        const point = SVGPathCommander.getPointAtLength(
            this.path,
            this.pathLen * easeFunc(percent),
        )
        this._progress = percent
        return this.k.vec2(point.x, point.y)
    }
    moveTo(percent: number, easeFunc: EaseFunc = this.k.easings.linear): Vec2 {
        if (percent < 0 || percent > 1) {
            console.error("Percent value must be 0 <= percent <= 1")
            return this.k.vec2()
        }
        const point = SVGPathCommander.getPointAtLength(
            this.path,
            this.pathLen * easeFunc(percent),
        )
        this._progress = percent
        return this.k.vec2(point.x, point.y)
    }
    get progress(): number {
        return this._progress
    }
    get finished(): boolean {
        return this.progress === 1
    }
}
